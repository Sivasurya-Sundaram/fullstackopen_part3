const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(cors());
morgan.token("requestBody", (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
});
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :requestBody"
  )
);

let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(contacts);
});
app.get("/info", (request, response) => {
  let date = new Date().toString();
  response.send(
    `<p>Phonebook has info for ${contacts.length} people<p><br/>${date}`
  );
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = contacts.find((x) => x.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  contacts = contacts.filter((x) => x.id !== id);
  response.status(204).end();
});
const generateId = () => {
  return Math.floor(Math.random() * 10000);
};
app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: !person.name ? "name is missing" : "number is missing",
    });
  }
  if (contacts.some((x) => x.name === person.name)) {
    return response.status(400).json({
      error: `contact with name ${person.name} already exists`,
    });
  }
  const contact = {
    id: generateId(),
    name: person.name,
    number: person.number,
  };
  contacts = contacts.concat(contact);
  response.json(contact);
});

const PORT = 3001;
app.listen(PORT);
console.log(`server started on ${PORT}`);
