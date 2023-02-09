import { ContactForm } from "components/ContactForm/ContactForm";
import { ContactList } from "components/ContactList/ContactList";
import { Filter } from "components/Filter/Filter";
import { ToastContainer } from "react-toastify";

import { Wrapper, TitlePhonebook, TitleContacts } from "components/App.styled";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <Wrapper>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm />
      <TitleContacts>Contacts</TitleContacts>
      <Filter />
      <ContactList />
      <ToastContainer />
    </Wrapper>
  ); 
};