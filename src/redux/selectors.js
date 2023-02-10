import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectLoadinStatus = state => state.contacts.isLoading;
export const selectErrorStatus = state => state.contacts.error;
export const selectFilter = state => state.filter;

export const selectFiltredContacts = createSelector(
    [selectFilter, selectContacts],

    (filter, contacts) => { 
        if (!filter) {
            return contacts;
        };

        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    },
);