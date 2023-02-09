import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteContact } from "redux/contactThunk";
import { toast } from "react-toastify";
import { Item, Button } from "components/ContactItem/ContactItem.styled";

export const ContactItem = ({ contact }) => {
    const { id, name, phone } = contact;
    const dispatch = useDispatch();

    const handleDelete = () => { 
        dispatch(deleteContact(id));
        const notifyInfo = (message) => toast.info(message);
        notifyInfo(`Deleted contact "${name}"`);
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