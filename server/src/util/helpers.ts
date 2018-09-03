import crypto from "crypto";

export const getScreenshotName = (url: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(url);
  const filename = `${hash.digest("hex")}.png`;
  return filename;
};