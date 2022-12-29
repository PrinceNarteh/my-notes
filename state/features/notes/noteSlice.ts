"use client";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { INote } from "../../../types";
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
      state.filteredNotes = action.payload;
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
          state.filteredNotes = state.notes;
          break;
        case "favorites":
          const favoriteNotes = state.notes.filter(
            (note) => note.favorite === true
          );
          state.filteredNotes = favoriteNotes;
          break;
        case "trash":
          const trashNotes = state.notes.filter(
            (note) => note.favorite === true
          );
          state.filteredNotes = trashNotes;
          break;
        default:
          state.filteredNotes = state.notes;
          break;
      }
    },
    searchNote: (state, action: PayloadAction<string>) => {
      const foundNotes = state.notes.filter(
        (note) =>
          note.title.includes(action.payload) ||
          note.content.includes(action.payload)
      );
      state.filteredNotes = foundNotes;
    },
  },
});

export const selectAllNotes = (state: RootState) => state.notes;
export const { addNote, deleteNote, replaceNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
