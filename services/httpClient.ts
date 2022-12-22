import axios from "axios";

console.log(process.env.baseURL);
export const httpClient = axios.create({
  baseURL: process.env.baseURL,
});
