const fs = require("fs");

const rootDir = require("../utils/path");
const path = require("path");

const filepath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourites {
  static addtoFavourites(id) {
    let favourites = { blogs: [] };
    fs.readFile(filepath, (err, fileContent) => {
      if (!err) {
        favourites = JSON.parse(fileContent);
      }
      const existingBlog = favourites.blogs.find((b) => b.id === id);
      if (!existingBlog) {
        const newFavourite = { id: id };
        favourites.blogs = [...favourites.blogs, newFavourite];
        fs.writeFile(filepath, JSON.stringify(favourites), (err) => {
          console.log(err);
        });
      } else {
        return 
      }
    });
  }
  static getFavourites(favBlogs){
    fs.readFile(filepath,(err, fileContent)=>{
        const favourites = JSON.parse(fileContent)
        if(err){
            favBlogs(null)
        }else{
            favBlogs(favourites)
        }
    })

  }
  static removeFavourites(id){
    fs.readFile(filepath, (err, fileContent)=>{
        const favourites = {...JSON.parse(fileContent)}
        if(!err){    
            favourites.blogs = favourites.blogs.filter(blog=> blog.id !== id)
            fs.writeFile(filepath, JSON.stringify(favourites), err=>{
                console.log(err)
            })
        }else{
            console.log(err)
        }
    })
  }
};
