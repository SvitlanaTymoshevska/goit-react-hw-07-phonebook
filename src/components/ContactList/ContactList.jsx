import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "redux/contactThunk";
import { selectLoadinStatus, selectErrorStatus, selectFiltredContacts } from "redux/selectors";
import { ThreeDots } from "react-loader-spinner";
import { ContactItem } from "components/ContactItem/ContactItem";
import { toast } from "react-toastify";

export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectFiltredContacts);
    const isLoading = useSelector(selectLoadinStatus);
    const error = useSelector(selectErrorStatus);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    
    if (error) {
        const notifyError = (message) => toast.error(message);
        notifyError(error);
        return;
    };

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
                />}

            {contacts.length && !isLoading && !error && 
                (<ul>
                    {contacts.map(contact => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                        />
                    ))}
                </ul>)}

            {!contacts.length && !isLoading && !error && <p>Contacts not found</p>}
        </>
    );
};
