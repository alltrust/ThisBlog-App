const Blog = require("../models/blogs");
const Favourites = require("../models/user-favourites");

exports.getIndex = (req, res, next) => {
  res.render("user/index");
  //random selection of blog from array to display 1 blog with
  //the welcome page
};

exports.getBlogs = (req, res, next) => {
  Blog.fetchAll((blogs) => {
    res.render("user/blog-list", {
      blogs: blogs,
      pageTitle: "Blogs",
      path: "blogs",
    });
  });
};

exports.getBlogDetails = (req, res, next) => {
  const blogId = req.params.blogId;
  Blog.findBlogById(blogId, (blogObject) => {
    res.render("user/blog-details", {
      blog: blogObject,
      pageTitle: blogObject.title,
      path: "/blogs",
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourites.getFavourites((favBlogs) => {
    Blog.fetchAll((blogs) => {
      const favsArray = [];
      for (bl of blogs) {
        const bExists = favBlogs.blogs.find((bdata) => bdata.id === bl.id);
        if (bExists) {
          favsArray.push(bl);
        }
      }
      res.render("user/favourites", {
        pageTitle: "Favourites",
        path: "/favourites",
        blogs: favsArray
      });
    });
  });
}; 


exports.postFavourites = (req, res, next) => {
  const blogId = req.body.blogId;
  Favourites.addtoFavourites(blogId);
  res.redirect("/favourites");
};

exports.postDeleteFavourite = (req, res, next)=>{
    const blogId = req.body.blogId;
    Favourites.removeFavourites(blogId);
    res.redirect("/favourites")
}
