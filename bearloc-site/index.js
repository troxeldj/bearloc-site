const express = require('express');
const app = express();
let ejs = require('ejs');
const PORT = 3000;
let bodyParser = require('body-parser');
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {});
})

app.post('/search', (req,res) => {
    res.send(`Num Bed: ${req.body.bedrooms}` + "<br>" +  `Num Bath: ${req.body.bathrooms}`)
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});