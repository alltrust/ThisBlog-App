const Blog = require("../models/blogs");

exports.getBlogs = (req, res, next) => {
  Blog.fetchAll((blogs) => {
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
  console.log(req.body);
  const title = req.body.title;
  const author = req.body.author;
  const imgUrl = req.body.imgUrl;
  const content = req.body.content;
  const blog = new Blog(null, title, author, imgUrl, content, null);
  blog.saveBlog();
  res.redirect("/");
};

exports.getEditBlogs = (req, res, next) => {
  const isEditMode = req.query.edit;
  if (!isEditMode) {
    return res.redirect("/");
  }
  const blogId = req.params.blogId;
  Blog.findBlogById(blogId, (blog) => {
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
  const blogNewDate = Date.now()
  const editedBlog = new Blog(
    blogId,
    blogTitle,
    blogAuthor,
    blogImgUrl,
    blogContent,
    blogNewDate
  );
  editedBlog.saveBlog();
  res.redirect("/admin/blogs");
};

exports.postDeleteBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.deleteBlog(blogId);
  res.redirect("/admin/blogs");
};
