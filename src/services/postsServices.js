import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3001";

export function getAllPosts() {
  const response = axios.get(`${baseURL}/posts`);
  return response;
}

export function getTopPost() {
  const response = axios.get(`${baseURL}/posts/top`);
  return response;
}

export function searchPosts(title) {
  const response = axios.get(`${baseURL}/posts/search?title=${title}`);
  return response;
}

export function getAllPostsByUser() {
  const response = axios.get(`${baseURL}/posts/byUserId`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function createNews(body) {
  const response = axios.post(`${baseURL}/posts/create`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getNewsById(id) {
  const response = axios.get(`${baseURL}/posts/byIdPost/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function editNews(body, id) {
  const response = axios.patch(`${baseURL}/posts/update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function deleteNews (id) {
  const response = axios.delete(`${baseURL}/posts/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}