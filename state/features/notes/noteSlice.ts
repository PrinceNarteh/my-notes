import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../../../types";
import { RootState } from "../../store";

export interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
  },
});

export const selectAllNotes = (state: RootState) => state.notes;
export const { setNotes } = noteSlice.actions;
export default noteSlice.reducer;
