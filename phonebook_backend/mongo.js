/*eslint linebreak-style: ["error", "windows"]*/
const mongoose = require('mongoose')
if (process.argv.length < 3) {
    // eslint-disable-next-line quotes
    console.log(`give password as argument`)
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://gamerganapathi:${password}@cluster0.8b17nvq.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Contact = mongoose.model('Contact', contactSchema)
if (process.argv.length > 3 && process.argv.length <= 5) {
    let name = process.argv[3]
    let number = process.argv[4]
    const contact = new Contact({
        name: name,
        number: number,
    })
    contact.save().then(() => {
        console.log('contact saved')
        mongoose.connection.close()
    })
} else if (process.argv.length == 3) {
    Contact.find({}).then((result) => {
        result.forEach((contact) => {
            console.log(contact)
        })
        mongoose.connection.close()
    })
} else {
    console.log('please give the name and number as argument')
    process.exit(1)
}
