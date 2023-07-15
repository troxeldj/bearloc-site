const express = require('express');
const app = express();
const ejs = require('ejs');
const PORT = 3000;
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {});
})

app.post('/search', (req,res) => {
    userparams = {bedrooms: req.body.bedrooms, bathrooms: req.body.bathrooms}
    res.render('search', userparams)
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});