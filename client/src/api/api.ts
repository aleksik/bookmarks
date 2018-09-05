import axios from "axios";
import { API_BASE_URL } from "../util/constants";

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

export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.post(API_BASE_URL + "/auth/login", {username, password}, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return true;
  } catch (error) {
    console.error(error);
    return Promise.reject("Wrong username or password");
  }
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(API_BASE_URL + "/auth", {
      withCredentials: true
    });
    return true;
  } catch (error) {
    return Promise.reject("Not authenticated");
  }
};
