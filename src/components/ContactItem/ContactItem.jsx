import { useDispatch } from "react-redux";
import { deleteContact } from "redux/contactsSlice";
import { Item, Button } from "components/ContactItem/ContactItem.styled";
import PropTypes from "prop-types";

export const ContactItem = ({ contact }) => {
    const { id, name, number } = contact;
    const dispatch = useDispatch();

    const handleDelete = () => dispatch(deleteContact(id));

    return (
        <Item>
            {name} {number}
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
        number: PropTypes.string.isRequired,
    })
};