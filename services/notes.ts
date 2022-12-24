import { httpClient } from "./httpClient";

export const getNotes = async () => {
  try {
    const res = await httpClient("/notes");
    return res.data.notes;
  } catch (error) {
    return error;
  }
};