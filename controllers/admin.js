const Blog = require("../models/blog");

exports.getBlogs = (req, res, next) => {
  req.user.getBlogs().then((blogs) => {
    res.render("admin/blogs", {
      blogs: blogs,
      pageTitle: "Admin Blogs",
      path: "/admin/blogs",
    });
  });
};

exports.getAddBlogs = (req, res, next) => {
  res.render("admin/edit-blogs", {
    pageTitle: "Edit",
    path: "/admin/add-blogs",
  });
};

exports.postAddBlogs = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const imgUrl = req.body.imgUrl;
  const content = req.body.content;
  req.user
    .createBlog({
      title: title,
      author: author,
      imgUrl: imgUrl,
      content: content,
    })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditBlogs = (req, res, next) => {
  const isEditMode = req.query.edit;
  if (!isEditMode) {
    return res.redirect("/");
  }
  const blogId = req.params.blogId;
  req.user.getBlogs({ where: { id: blogId } }).then((blogs) => {
    const blog = blogs[0];
    if (!blog) {
      res.redirect("/admin/blogs");
    }
    res.render("admin/edit-blogs", {
      pageTitle: "Edit Blog",
      path: "/admin/edit-blogs",
      isEdit: isEditMode,
      blog: blog,
    });
  });
};

exports.postEditBlogs = (req, res, next) => {
  const blogId = req.body.blogId;
  const blogTitle = req.body.title;
  const blogAuthor = req.body.author;
  const blogImgUrl = req.body.imgUrl;
  const blogContent = req.body.content;
  Blog.findByPk(blogId)
    .then((blog) => {
      (blog.title = blogTitle),
        (blog.author = blogAuthor),
        (blog.imgUrl = blogImgUrl),
        (blog.content = blogContent);
      return blog.save();
    })
    .then(() => {
      res.redirect("/admin/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.findByPk(blogId)
    .then((blog) => {
      return blog.destroy();
    })
    .then(() => {
      res.redirect("/admin/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
