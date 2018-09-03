import mongoose from "mongoose";

export type BookmarkModel = mongoose.Document & {
  title: string,
  url: string,
  tags: string[]
};

const bookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  tags: Array
}, {
  timestamps: true
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;