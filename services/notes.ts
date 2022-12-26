import { INote } from "../types";
import { httpClient } from "./httpClient";

export const getNotes = async () => {
  try {
    const res = await httpClient("/notes");
    return res.data.notes;
  } catch (error) {
    return error;
  }
};

export const updateNote = async (id: string, data: Partial<INote>) => {
  try {
    const res = await httpClient.patch(`/notes/${id}`, data);
    return res.data.notes;
  } catch (error) {
    return error;
  }
};

export const deleteNote = async (id: string) => {
  try {
    const res = await httpClient.delete(`/notes/${id}`);
    return res.data.notes;
  } catch (error) {
    return error;
  }
};
