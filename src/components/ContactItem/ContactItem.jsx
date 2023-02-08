import { useDispatch } from "react-redux";
import { deleteContact } from "redux/contact.thunk";
import { Item, Button } from "components/ContactItem/ContactItem.styled";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const ContactItem = ({ contact }) => {
    const { id, name, phone } = contact;
    const dispatch = useDispatch();

    const handleDelete = () => { 
        dispatch(deleteContact(id));
        const notifySuccess = (message) => toast.info(message);
        notifySuccess(`Contact "${name}" has been deleted from the contact list.`);
    };

    return (
        <Item>
            {name}: {phone}
            <Button
                type="button"
                onClick={handleDelete}>
                Delete
            </Button>
        </Item>
    )
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    })
};