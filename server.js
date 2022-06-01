// const app=require('./Backend/app');
// 
// app.listen(3001,()=>{
// console.log('Server listening on PORT 3000');
// });
// 
// 

//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/projet'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/projet/'}),
);
const port = process.env.PORT || 8080;
// Start the app by listening on the default Heroku port
app.listen(port,()=>{
    console.log(`Server connected on port :${port}`);
    });