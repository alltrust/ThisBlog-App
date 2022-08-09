const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database");
const User = require("./models/user");
const Blog = require("./models/blog");
const Favourite = require("./models/favourite");
const Comment = require("./models/comment");
const BlogFav = require("./models/fav-blog");

const app = express();

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const displayErrorRoute = require("./controllers/error");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.use(displayErrorRoute.get404page);

Blog.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Blog);
User.hasOne(Favourite);
Favourite.belongsTo(User);
Favourite.belongsToMany(Blog, { through: BlogFav });
Blog.belongsToMany(Favourite, { through: BlogFav });
User.hasMany(Comment);
Comment.belongsTo(Blog);
Blog.hasMany(Comment);

// Favourite.belongsToMany(Blog, {through})

sequelize
//   .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })

  .then((user) => {
    if (!user) {
      return User.create({ name: "Aldo", email: "test@test.ca" });
    }
    return user;
  })
  .then((user) => {
    user.createFavourite();
  })
  .then((favourite) => {
    console.log(favourite);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
