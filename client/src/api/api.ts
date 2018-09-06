import axios from "axios";
import { API_BASE_URL } from "../util/constants";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    common: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }
});

const setToken = (token: string) => {
  localStorage.setItem("token", token);
  client.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export const getBookmarks = async (): Promise<Bookmark[]> => {
  try {
    const response = await client.get("/bookmarks");
    const { bookmarks } = response.data;
    return bookmarks;
  } catch (error) {
    console.error(error);
    return Promise.reject("Failed to get bookmarks");
  }
};

export const getPreview = async (url: string): Promise<Preview> => {
  try {
    const response = await client.get("/preview", {
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
    const response = await client.post("/bookmark", bookmark, {
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
    const response = await client.get("/tags");
    const { tags } = response.data;
    return tags;
  } catch (error) {
    console.error(error);
    return Promise.reject("Failed to get tags");
  }
};

export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await client.post("/auth/login", {username, password}, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { token } = response.data;
    if (token) {
      setToken(token);
      return true;
    }
  } catch (error) {
    console.error(error);
    return Promise.reject("Wrong username or password");
  }
  return false;
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    await client.get("/auth");
    return true;
  } catch (error) {
    return Promise.reject("Not authenticated");
  }
};
