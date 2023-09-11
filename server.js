require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require('./models/fruit');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

//// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
//////////////////////////

const jsxViewEngine = require('jsx-view-engine');

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

//CSS IMPORT
//Serves static files (CSS) from the /public directory
app.use(express.static('public'));

// Middleware;
app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next();
});
// By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

// const middleware = (req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// };

// Index
app.get('/fruits', async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    console.log(foundFruits);
    res.status(200).render('fruits/Index', {
      fruits: foundFruits,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New
app.get('/fruits/new', (req, res) => {
  console.log('New controller');
  res.render('fruits/New');
});

// Delete

app.delete('/fruits/:id', async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id)
    res.status(200).redirect('/fruits')
  } catch (err){
    res.status(400).send(err)
  }
})

// Update

app.put('/fruits/:id', async (req, res) => {
  //this is checking if it's checked (true) or unchecked (false)
  try{
    if (req.body.readyToEat === 'on'){
      req.body.readyToEat = true
    } else {
      req.body.readyToEat = false
    }
    //this id is from the URL we get from clicking the edit button
    const updatedFruit = await Fruit.findByIdAndUpdate(
    req.params.id, 
    //The information from the form, with the update that we made
    req.body,
    //need this to prevent a delay in the update
    {new: true})
    console.log(updatedFruit)
    res.redirect(`/fruits/${req.params.id}`)
  } catch (err){
    res.status(400).send(err)
  }
})

// Create
app.post('/fruits', async (req, res) => {
  try {
    // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //   req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //   req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === 'on';

    const createdFruit = await Fruit.create(req.body);

    res.status(201).redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Edit
app.get('/fruits/:id/edit', async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id)
    //passing in the foundFruit assigned to the specific id from the database
    res.render('fruits/edit', {fruit: foundFruit})
  }catch (err) {
    res.status(400).send(err)
  }
})

// Show
app.get('/fruits/:id', async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);

    //second param of the render method must be an object
    res.render('fruits/Show', {
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});