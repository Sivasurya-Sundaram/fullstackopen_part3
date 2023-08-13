import axios from "axios";
const baseUrl = "/api/persons";
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};
const create = (contact) => {
  const request = axios.post(baseUrl, contact);
  return request.then((res) => res.data);
};
const update = (id, contact) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.put(url, contact);
  return request.then((res) => res.data);
};
const deleteContact = (id) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.delete(url);
  return request.then((res) => res);
};
var contactService = {
  getAll,
  create,
  update,
  deleteContact,
};
export default contactService;
