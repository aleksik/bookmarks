import { Request, Response, Router } from "express";
import { validationResult, check } from "express-validator/check";
import puppeteer from "puppeteer";
import { existsSync } from "fs";
import { SCREENSHOTS_PATH } from "../util/secrets";
import { getScreenshotName } from "../util/helpers";
import Bookmark from "../models/bookmark";

const router = Router();

/**
 * GET /api/
 * Just let them know we're here.
 */
export const getApi = (req: Request, res: Response) => {
  res.send({ status: "OK" });
};
router.get("/", getApi);

/**
 * GET /api/preview
 * Get title and screenshot of an URL
 */
export const getPreview = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {url} = req.query;
  const filename = getScreenshotName(url);
  const path = `${SCREENSHOTS_PATH}/${filename}`;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 840 });
    await page.goto(url, { waitUntil: "networkidle0" });

    if (!existsSync(path)) {
      await page.screenshot({ path });
    }

    const title = await page.title();
    await browser.close();

    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.status(200).json({
      title,
      screenshot: filename
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
router.get("/preview", [check("url").isURL()], getPreview);

/**
 * POST /api/bookmark
 * Create a bookmark
 */
export const postBookmark = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {title, url, tags} = req.body;
  const screenshot = getScreenshotName(url);

  try {
    const bookmark = await Bookmark.create({title, url, tags, screenshot});
    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).json({error});
  }
};
router.post("/bookmark", [
  check("title").isString(),
  check("url").isURL(),
  check("tags").isArray()
], postBookmark);

/**
 * GET /api/bookmarks
 * List bookmarks
 */
const getBookmarks = (req: Request, res: Response) => {
  Bookmark.find((error, bookmarks) => {
    if (error) {
      return res.status(500).json({error});
    }
    res.status(200).json({bookmarks});
  });
};
router.get("/bookmarks", getBookmarks);

/**
 * GET /api/tags
 * List tags
 */
const getTags = (req: Request, res: Response) => {
  Bookmark.collection.distinct("tags", {}).then((tags: any) => {
    res.status(200).json({tags});
  }).catch((error) => {
    res.status(500).json({error});
  });
};
router.get("/tags", getTags);

export default router;