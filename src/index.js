require('dotenv').config(); // for load my env variables
const express      = require('express');
const mongoose     = require('mongoose');
const movieRoutes  = require('./routes/movieRoutes');

const app = express();

//connect to mongoDB
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log(err));

// Middleware to accept JSON
app.use(express.json());

// Use the routes
app.use('/', movieRoutes);

const port = process.env.PORT;
app.listen(port, () =>{
    console.log(`Application app listening on port ${port}`);
});