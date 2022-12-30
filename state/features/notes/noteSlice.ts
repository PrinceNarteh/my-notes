"use client";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { INote } from "../../../types/note";
import { RootState } from "../../store";

export interface NoteState {
  notes: INote[];
  filteredNotes: INote[];
}

const initialState: NoteState = {
  notes: [],
  filteredNotes: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<INote[]>) => {
      state.notes = action.payload;
      state.filteredNotes = action.payload.filter(
        (note) => note.trash !== true
      );
    },
    addNote: (state, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
    },
    replaceNote: (state, action: PayloadAction<INote>) => {
      const newState = state.notes.map((note) => {
        if (note._id === action.payload._id) return action.payload;
        return note;
      });
      state.notes = newState;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const newState = state.notes.filter(
        (note) => note._id !== action.payload
      );
      state.notes = newState;
    },
    filterNotes: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "all":
          state.filteredNotes = state.notes.filter(
            (note) => note.trash !== true
          );
          break;
        case "favorites":
          const favoriteNotes = state.notes.filter(
            (note) => note.favorite === true && note.trash !== true
          );
          state.filteredNotes = favoriteNotes;
          break;
        case "trash":
          const trashNotes = state.notes.filter((note) => note.trash === true);
          state.filteredNotes = trashNotes;
          break;
        default:
          state.filteredNotes = state.notes.filter(
            (note) => note.trash !== true
          );
          break;
      }
    },
    searchNote: (state, action: PayloadAction<string>) => {
      const foundNotes = state.notes.filter(
        (note) =>
          (note.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            note.content
              .toLowerCase()
              .includes(action.payload.toLowerCase())) &&
          note.trash !== true
      );
      state.filteredNotes = foundNotes;
    },
  },
});

export const selectAllNotes = (state: RootState) => state.notes;
export const {
  addNote,
  deleteNote,
  replaceNote,
  setNotes,
  filterNotes,
  searchNote,
} = noteSlice.actions;
export default noteSlice.reducer;
