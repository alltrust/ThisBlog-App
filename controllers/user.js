const Blog = require("../models/blog");
const Comment = require("../models/comment");

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
      return blog
        .getComments({ where: { blogId: blogId } })
        .then((comments) => {
          res.render("user/blog-details", {
            blog: blog,
            pageTitle: blog.title,
            path: "/blogs",
            comments: comments,
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
  console.log(blogId);
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

exports.postAddComment = (req, res, next) => {
  const blogId = req.body.blogId;
  const comment = req.body.comment;
  req.user
    .createComment({
      content: comment,
      blogId: blogId,
    })
    .then(() => {
      res.redirect(`/blogs/${blogId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteComment = (req, res, next) => {
  const commentId = req.body.commentId;
  const blogId = req.body.blogId;
  Comment.findByPk(commentId)
    .then((comment) => {
      return comment.destroy();
    })
    .then(() => {
      res.redirect(`/blogs/${blogId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditComment = (req, res, next) => {
  const commentId = req.params.commentId;
  const blogId = req.params.blogId;
  const isEditMode = req.query.edit;
  if (!isEditMode) {
    return res.redirect("/");
  }
  Blog.findByPk(blogId)
    .then((blog) => {
      return blog.getComments({ where: { id: commentId } }).then((comments) => {
        const comment = comments[0];
        if (!comment) {
          res.redirect(`/blogs/${blogId}`);
        }
        res.render("user/blog-details", {
          pageTitle: "Edit Comment",
          path: "/blogs",
          isEdit: isEditMode,
          comment: comment,
          comments:comments,
          blog: blog,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditComment = (req, res, next) => {
  const commentId = req.body.commentId;
  const blogId = req.body.blogId;
  const updatedComment = req.body.comment;
  console.log(req)
  Comment.findByPk(commentId)
    .then((comment) => {
      comment.content = updatedComment;
      return comment.save();
    })
    .then(() => {
      res.redirect(`/blogs/${blogId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddReply = (req, res, next) => {};
 