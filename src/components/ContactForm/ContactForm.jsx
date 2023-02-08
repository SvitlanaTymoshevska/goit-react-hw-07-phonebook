import { useSelector, useDispatch } from "react-redux";
import { getContacts } from "redux/contactsSlice";
import { addContact } from "redux/contact.thunk";
import { toast } from "react-toastify";
import { Form, Label, LabelName, Input, Button } from "components/ContactForm/ContactFotm.styled";
// import { createGlobalStyle } from "styled-components";

export const ContactForm = () => {
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.elements.name.value; 
        const phone = form.elements.phone.value; 

        let findedName = null;

        if (!contacts) {
            return;
        } else { 
            findedName = contacts.find(contact => { 
                if (contact.name.toLowerCase() === name.toLowerCase() && contact.phone === phone) {
                    return contact.name;
                };
                return undefined;
            });
        };
        
        if (findedName) {
            const notifyError = (message) => toast.error(message);
            notifyError(`${findedName.name} is alredy in contacts.`);
            return;
        }

        dispatch(addContact({ name, phone }));
        const notifySuccess = (message) => toast.success(message);
        notifySuccess(`Contact "${name}" has been added to the contact list.`);
        form.reset();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label>
                <LabelName>
                    Name  
                </LabelName>
                <Input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </Label>
            <Label>
                <LabelName>
                    Phone number
                </LabelName>        
                <Input
                    type="tel"
                    name="phone"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </Label>
            <Button 
                type="submit">
                Add contact
            </Button>
        </Form>
    );
};