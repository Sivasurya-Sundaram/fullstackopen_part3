require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Contact = require("./models/contact");
app.use(cors());
app.use(express.static("build"));
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

// let contacts = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});
app.get("/info", (request, response) => {
  let date = new Date().toString();
  Contact.find({}).then((contacts) => {
    response.send(
      `<p>Phonebook has info for ${contacts.length} people<p><br/>${date}`
    );
  });
});
app.get("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id);
  // const person = contacts.find((x) => x.id === id);
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
  Contact.findById(request.params.id).then((contact) => {
    response.json(contact);
  });
});
app.delete("/api/persons/:id", (request, response) => {
  Contact.findByIdAndDelete(request.params.id).then((res) => {
    response.status(204).end();
  });
});
app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: !person.name ? "name is missing" : "number is missing",
    });
  }
  Contact.find({ name: person.name }).then((contacts) => {
    if (contacts.length > 0) {
      return response.status(400).json({
        error: `contact with name ${person.name} already exists`,
      });
    } else {
      const contact = Contact({
        name: person.name,
        number: person.number,
      });
      contact.save().then((savedContact) => {
        response.json(savedContact);
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`server started on ${PORT}`);
