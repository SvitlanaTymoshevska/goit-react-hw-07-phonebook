import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "redux/contactThunk";
import { getContacts, getLoadinStatus, getErrorStatus } from "redux/contactsSlice";
import { getFilter } from "redux/filterSlice";
import { ThreeDots } from "react-loader-spinner";
import { ContactItem } from "components/ContactItem/ContactItem";
import { toast } from "react-toastify";

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
    
    if (error) {
        const notifyError = (message) => toast.error(message);
        notifyError(error);
        return;
    };

    const filtredContacts = getFiltredContacts(contacts, filter);

    return (
        <>
            {isLoading && !error && <ThreeDots 
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
            {!isLoading && !error && <ul>
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
