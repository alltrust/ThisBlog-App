exports.getBlogs = (req,res, next)=>{
    res.render('admin/blogs', {pageTitle: "Admin Blogs", path: "/admin/blogs"})
};

exports.getAddBlogs = (req,res,next)=>{
    res.render('admin/edit-blogs', {pageTitle: "Edit", path:"/admin/edit-blogs"})
}