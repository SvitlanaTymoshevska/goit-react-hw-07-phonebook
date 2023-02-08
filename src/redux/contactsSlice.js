import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { nanoid } from "nanoid";

const contaktsInitialState = {value: []};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contaktsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.value.push(action.payload);
      },
      prepare(name, number) {
        return {
            payload: {
                id: nanoid(),
                name,
                number
            },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.value.findIndex(contact => contact.id === action.payload);
      state.value.splice(index, 1);
    },
  },
});

const persistConfig = {
  key: "contacts",
  storage,
};

export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);
export const { addContact, deleteContact } = contactsSlice.actions;
export const getContacts = state => state.contacts.value;