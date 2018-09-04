type Preview = {
  title: string;
  screenshot: string;
};

type Tag = string;

type Bookmark = {
  _id: string;
  title: string;
  url: string;
  screenshot: string;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

type CreateBookmarkRequest = {
  title: string;
  url: string;
  tags: Tag[];
};