import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { INote } from "../../../types";
import { RootState } from "../../store";

export interface NoteState {
  notes: INote[];
}

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<INote[]>) => {
      state.notes = action.payload;
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
  },
});

export const selectAllNotes = (state: RootState) => state.notes;
export const { addNote, deleteNote, replaceNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
