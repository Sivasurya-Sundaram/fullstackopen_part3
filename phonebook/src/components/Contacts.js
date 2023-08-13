const DisplayContacts = ({ contact,handleDeleteClick}) => {
  return (
    <li>
      {contact.name}---{contact.number} <button onClick={handleDeleteClick}>delete</button>
    </li>
  );
};
export default DisplayContacts;
