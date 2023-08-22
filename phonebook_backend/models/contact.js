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
  name: String,
  number: String,
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
