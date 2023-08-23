const mongoose = require("mongoose");
const url = process.env.DBURL;
mongoose.set("strictQuery", true);
mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Error while connect to DB:", error.message);
  });
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (value) => {
        return /\d{2,3}-\d{5,}/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});
contactSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (document, returnedObject) => {
    delete returnedObject._id;
  },
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
