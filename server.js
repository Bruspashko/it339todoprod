const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const todoModel = require('./models/todo');
const bodyParser = require('body-parser');
const schema = require('./schema');
const cors = require('cors')
const app = express();
const basicAuth = require('express-basic-auth')

app.use(basicAuth({
users: { 'admin': 'supersecret' }
 , challenge: true
}))


app.use(cors())
// Replace with your mongoLab URI
const MONGO_URI = 'mongodb+srv://it339-ostap:vbc5NasuvsY6Wwh8@cluster0-0rdwi.gcp.mongodb.net/todos?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));  

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  res.redirect('/graphql');
});

app.listen(process.env.PORT, () => {
  console.log('Listening at '.process.env.PORT);
});
