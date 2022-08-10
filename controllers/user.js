const Blog = require("../models/blog");

exports.getIndex = (req, res, next) => {
  Blog.findAll()
    .then((blogs) => {
      res.render("user/index", {
        blogs: blogs,
        pageTitle: "Main",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //random selection of blog from array to display 1 blog with
  //the welcome page
};

exports.getBlogs = (req, res, next) => {
  Blog.findAll()
    .then((blogs) => {
      res.render("user/blog-list", {
        blogs: blogs,
        pageTitle: "Blogs",
        path: "/blogs",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBlogDetails = (req, res, next) => {
  const blogId = req.params.blogId;
  Blog.findByPk(blogId)
    .then((blog) => {
      res.render("user/blog-details", {
        blog: blog,
        pageTitle: blog.title,
        path: "/blogs",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFavourites = (req, res, next) => {
  req.user
    .getFavourite()
    .then((favs) => {
      return favs
        .getBlogs()
        .then((blogs) => {
          res.render("user/favourites", {
            pageTitle: "Favourites",
            path: "/favourites",
            blogs: blogs,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postFavourites = (req, res, next) => {
  const blogId = req.body.blogId;
  req.user
    .getFavourite()
    .then((favourites) => {
      Blog.findByPk(blogId)
        .then((blog) => {
          return favourites.addBlog(blog);
        })
        .then(() => {
          res.redirect("/favourites");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteFavourite = (req, res, next) => {
  const blogId = req.body.blogId;
  req.user
    .getFavourite()
    .then((favourites) => {
      return favourites.getBlogs({ where: { id: blogId } }).then((blogs) => {
        const blog = blogs[0];
        return blog.favBlog.destroy(blog);
      });
    })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log(err);
    });
};
