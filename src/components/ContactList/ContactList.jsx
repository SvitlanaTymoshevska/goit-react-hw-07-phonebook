import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchContacts } from "redux/contact.thunk";
import { getContacts, getLoadinStatus, getErrorStatus } from "redux/contactsSlice";
import { getFilter } from "redux/filterSlice";

import { ThreeDots } from "react-loader-spinner";
import { ContactItem } from "components/ContactItem/ContactItem";



const getFiltredContacts = (contacts, filter) => {
    if (!filter) {
        return contacts;
    }

    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterLowerCase));
};

export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const isLoading = useSelector(getLoadinStatus);
    const error = useSelector(getErrorStatus);
    const filter = useSelector(getFilter);

    useEffect(() => {
    dispatch(fetchContacts());
    }, [dispatch]);
    
    if (!contacts) {
        return;
    };
    
    const filtredContacts = getFiltredContacts(contacts, filter);

    return (
        <>
            {isLoading && <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{"justifyContent":"center"}}
                wrapperClassName=""
                visible={true}
                />
            }
            {!error && !isLoading && <ul>
                    {filtredContacts.map(contact => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                        />
                    ))}
                </ul>
            }

        </>

    );
};
