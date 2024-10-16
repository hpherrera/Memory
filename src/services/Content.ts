import axios from "axios";

export const baseUrl = " https://challenge-uno.vercel.app/api";

export const getImages = async () => {
  const apiUrl = `${baseUrl}/images`;
  return await axios.get(apiUrl);
};