import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const getBookmarks = async (): Promise<Bookmark[]> => {
  try {
    const response = await axios.get(API_BASE_URL + "/bookmarks");
    const { bookmarks } = response.data;
    return bookmarks;
  } catch (error) {
    console.error(error);
    return Promise.reject("Failed to get bookmarks");
  }
};

export const getPreview = async (url: string): Promise<Preview> => {
  try {
    const response = await axios.get(API_BASE_URL + "/preview", {
      params: { url }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Failed to get the preview");
  }
};

export const createBookmark = async (bookmark: CreateBookmarkRequest): Promise<Bookmark> => {
  try {
    const response = await axios.post(API_BASE_URL + "/bookmark", bookmark, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject("Failed to create bookmark");
  }
};

export const getTags = async (): Promise<string[]> => {
  try {
    const response = await axios.get(API_BASE_URL + "/tags");
    const { tags } = response.data;
    return tags;
  } catch (error) {
    console.error(error);
    return Promise.reject("Failed to get tags");
  }
};
