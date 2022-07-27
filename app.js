const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express()

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const displayErrorRoute = require('./controllers/error') 


app.set('view engine', 'pug')
app.set('views', 'views')

app.use('/admin', adminRoutes);
app.use(userRoutes)

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")))

app.use(displayErrorRoute.get404page)

app.listen(3000)