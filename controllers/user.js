exports.getIndex = (req, res, next) => {
  res.render("user/index");
  //random selection of blog from array to display 1 blog with
  //the welcome page
};

exports.getBlogs = (req, res, next) => {
  res.render("user/blog-list", { pageTitle: "Blogs", path: "blogs" });
};

exports.getFavourites = (req, res, next) => {
  res.render("user/favourites", {
    pageTitle: "Favourites",
    path: "/favourites",
  });
};
