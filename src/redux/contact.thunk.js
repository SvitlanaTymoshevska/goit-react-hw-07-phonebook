import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://63e3b51865ae49317715841a.mockapi.io/api";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async () => {
        const response = await axios.get("/contacts");
        return response.data;
    }
);

export const addContact  = createAsyncThunk(
    "contacts/addContact",
    async (contact) => {
        const response = await axios.post("/contacts", contact);
        return response.data;
    }
);

export const deleteContact  = createAsyncThunk(
    "contacts/deleteContact",
    async (id) => {
        const response = await axios.delete(`/contacts/${id}`);
        return response.data;
    }
);