import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`
    : "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetcher = (url) => http.get(url).then((res) => res.data);
