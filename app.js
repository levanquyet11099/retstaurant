const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerlogin = require('./routes/login');
const routertable = require('./routes/table');
const routerproduct = require('./routes/product');
const routeroder = require('./routes/oder');
const session = require('express-session');
const flash = require('express-flash');

const app = express();


app.use(session({
  secret: '110901',
  resave: true,
  saveUninitialized: true
}));
app.use((req, res, next) => {
    if (!req.session) {
      req.session = {};
    }
    next();
  });

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb+srv://quyet1911:htHx2yRmV6g7d9ZL@cluster0.e1wg4.mongodb.net/restaurant?retryWrites=true&w=majority');

app.get('/', (req, res) => {
  res.render('login'); 
});
app.use(routerlogin);
app.use(routeroder);
app.use('/api/v1/table',routertable);
app.use('/api/v1/product',routerproduct)

app.listen(3000);


