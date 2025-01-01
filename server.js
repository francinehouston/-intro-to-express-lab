const express = require('express');
const morgan = require('morgan');



// Use Morgan middleware with the 'dev' option for concise output
app.use(morgan('dev'));

// Define routes here (we'll add them soon)

// Listen for requests on port 3001
app.listen(3001, () => {
  console.log('Listening on port 3001')
})


//1. Be Polite, Greet the User
//Task: Create a route that responds to URLs like /greetings/<username-parameter>.

//Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

//Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”/</username-parameter>

app.get('/greetings/:username',(req,res) => {
    const username= (req.params.username);

     //Sending a response with parameter
  res.send(`Hello there, ${username}! What a delight it is to see you once more!`);
});



app.get('/greetings/:name',(req,res) => {
  console.log(req.params.name);

   //Sending a response with parameter
res.send(`<h1>Hello there, ${req.params.name}!</h1>`);
});

// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

// Examples: Matches routes like /roll/6 or /roll/20.

// Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

// Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”

// Route to handle roll requests
app.get('/roll/:number', (req, res) => {
  const numberParam = req.params.number;

  // Validate that the parameter is a number
  const maxNumber = parseInt(numberParam, 10);
  if (isNaN(maxNumber)) {
      return res.send("You must specify a number.");
  }


// Generate a random number between 0 and the given number (inclusive)
const rolledNumber = Math.floor(Math.random() * (maxNumber + 1));
res.send('You rolled a ${rolledNumber}.');
});

app.get('/roll/:number', (req, res) => {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number) || number <= 0) {
    return res.status(400).send('You must specify a positive number.');
  }
  const roll = Math.floor(Math.random() * number) + 1;
  res.send(`You rolled a ${roll}`);
});


 // 3. I Want THAT One!
//Task: Create a route for URLs like /collectibles/<index-parameter>.

//Examples: Matches routes such as /collectibles/2 or /collectibles/0.

//Data Array:

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
      return res.status(404).send('This collectible is not available.');
    }
    const item = collectibles[index];
  res.send(`So you want the ${item.name}? It's priced at $${item.price}.`);
  }) ;




  //4. Task: Create a route /shoes that filters the list of shoes based on query parameters.

//Query Parameters:

//min-price: Excludes shoes below this price.
//max-price: Excludes shoes above this price.
//type: Shows only shoes of the specified type.
//No parameters: Responds with the full list of shoes.

const express = require('express');
const app = express();

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
app.get('/shoes', (req, res) => {  
  let { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
let filteredShoes = shoes;
  // Get query parameters
  //const minPrice = parseFloat(req.query['min-price']);
  //const maxPrice = parseFloat(req.query['max-price']);
  //const type = req.query['type'];

  // Apply filters based on query parameters
  if (minPrice) {
    minPrice = parseFloat(minPrice);
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }
  if (maxPrice) {
    maxPrice = parseFloat(maxPrice);
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }
  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
  }

  res.json(filteredShoes);
});

// Start the server 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});