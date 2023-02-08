import { useSelector } from "react-redux";
import { ContactItem } from "components/ContactItem/ContactItem";
import { getContacts } from "redux/contactsSlice";
import { getFilter } from "redux/filterSlice";

const getFiltredContacts = (contacts, filter) => {
    if (!filter) {
        return contacts;
    }

    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterLowerCase));
};

export const ContactList = () => {
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);

    if (!contacts) {
        return;
    };
    
    const filtredContacts = getFiltredContacts(contacts, filter);

    return (
        <ul>
            {filtredContacts.map(contact => (
                <ContactItem
                    key={contact.id}
                    contact={contact}
                />
            ))}
        </ul>
    );
};
