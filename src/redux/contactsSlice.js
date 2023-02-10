import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "redux/contactThunk";

export const contaktsInitialState = {items: [],
                              isLoading: false,
                              error: null};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contaktsInitialState,
  extraReducers: 
    builder => {
      builder
        .addCase(fetchContacts.pending, state => {
          state.isLoading = true;
        })
        .addCase(fetchContacts.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.error = null;
          state.items = payload;
        })
        .addCase(fetchContacts.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        })
        .addCase(addContact.pending, state => {
          state.isLoading = true;
        })
        .addCase(addContact.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.error = null;
          state.items.push(payload);
        })
        .addCase(addContact.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        })
        .addCase(deleteContact.pending, state => {
          state.isLoading = true;
        })
        .addCase(deleteContact.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.error = null;
          const index = state.items.findIndex(contact => contact.id === payload.id);
          state.items.splice(index, 1);
        })
        .addCase(deleteContact.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        });
    },
});

export const contactsReducer = contactsSlice.reducer;