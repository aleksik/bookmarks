import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { getScreenshotName } from "../util/helpers";
import { SCREENSHOTS_PATH } from "../util/constants";

export type BookmarkModel = mongoose.Document & {
  title: string;
  url: string;
  tags: string[];
  screenshot: string;
};

const bookmarkSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    tags: [String],
    screenshot: String
  },
  {
    timestamps: true
  }
);

bookmarkSchema.pre("save", function(next) {
  const bookmark = this as BookmarkModel;
  if (!fs.existsSync(path.join(SCREENSHOTS_PATH, bookmark.screenshot))) {
    bookmark.screenshot = "placeholder.png";
  }
  next();
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
