import { useSelector, useDispatch } from "react-redux";
import { addContact, getContacts } from "redux/contactsSlice";
import { Form, Label, LabelName, Input, Button } from "components/ContactForm/ContactFotm.styled";

export const ContactForm = () => {
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.elements.name.value; 
        const number = form.elements.number.value; 

        let findedName = null;

        if (!contacts) {
            return;
        } else { 
            findedName = contacts.find(contact => { 
                if (contact.name.toLowerCase() === name.toLowerCase() && contact.number === number) {
                    return contact.name;
                };
                return undefined;
            });
        };

        if (findedName) {
            alert(`${findedName} is alredy in contacts.`);
            return;
        }

        dispatch(addContact(name, number));
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
                    Number
                </LabelName>        
                <Input
                    type="tel"
                    name="number"
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