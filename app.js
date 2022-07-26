const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express()

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');


app.set('view engine', 'pug')
app.set('views', 'views')

// app.use('/admin', adminRoutes);
app.use(userRoutes)

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000)