import { useSelector, useDispatch } from "react-redux";
import { selectContacts } from "redux/selectors";
import { addContact } from "redux/contactThunk";
import { toast } from "react-toastify";
import { Form, Label, LabelName, Input, Button } from "components/ContactForm/ContactFotm.styled";

const contactInList = (contacts, name, phone) => { 
    let nameFinded = null;

    if (contacts) {
        nameFinded = contacts.find(contact => { 
            if (contact.name.toLowerCase() === name.toLowerCase() && contact.phone === phone) {
                return contact.name;
            };
            return undefined;
        });
    };

    if (nameFinded) {
        const notifyError = (message) => toast.error(message);
        notifyError(`${nameFinded.name} is alredy in contacts.`);
    }
    
    return nameFinded;
}

export const ContactForm = () => {
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.elements.name.value; 
        const phone = form.elements.phone.value; 

        if (contactInList(contacts, name, phone)) { 
            return;
        }

        dispatch(addContact({ name, phone }));
        const notifyInfo = (message) => toast.info(message);
        notifyInfo(`Added contact "${name}"`);
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