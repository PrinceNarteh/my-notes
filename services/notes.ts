import { INote } from "../types/note";
import { httpClient } from "./httpClient";

export const getNotes = async () => {
  try {
    const res = await httpClient("/notes");
    return res.data.notes;
  } catch (error) {
    return error;
  }
};
export const createNote = async (data: Partial<INote>) => {
  try {
    const res = await httpClient.post(`/notes`, data);
    return res.data.note;
  } catch (error) {
    return error;
  }
};

export const updateNote = async (data: Partial<INote>) => {
  try {
    const res = await httpClient.patch(`/notes/${data._id}`, data);
    return res.data.note;
  } catch (error) {
    return error;
  }
};

export const trashNote = async (id: string) => {
  try {
    const res = await httpClient.patch(`/notes/${id}/trash`);
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

export const toggleFavorite = async (id: string) => {
  try {
    const res = await httpClient.patch(`/notes/${id}/toggle-favorite`);
    return res.data.note;
  } catch (error: any) {
    return error.message;
  }
};
