const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const Favourites = require('./user-favourites')

const filepath = path.join(rootDir, "data", "blogs.json")

const getBlogsFromFile=(callback)=>{
    fs.readFile(filepath, (err, fileContent)=>{
        if(err){
            callback([])
        }else{
            callback(JSON.parse(fileContent))
        }
    })
}

module.exports = class Blog {
    constructor(id, title, author, imgUrl, content, date){
        this.id = id;
        this.title = title;
        this.author = author;
        this.imgUrl = imgUrl; 
        this.content = content; 
        this.date = date;
    }

    saveBlog(){
        getBlogsFromFile((blogs)=>{
            if(this.id){
                const existingBlogIndex = blogs.findIndex((blog)=>(
                    blog.id === this.id
                ))
                const updatedBlogs = [...blogs]
                allBlogs[existingBlogIndex] = this;
                fs.writeFile(filepath, JSON.stringify(updatedBlogs), (err)=>{
                    console.log(err)
                })
            }else{
                this.id = Math.random().toString();
                this.date = Date.now(); 
                blogs.push(this)
                fs.writeFile(filepath, JSON.stringify(blogs), (err)=>{
                    console.log(err)
                })
            }
        })

    }
    static fetchAll(blogs){
        getBlogsFromFile(blogs)
    }

    static findBlogById(id, blogCallback){
        getBlogsFromFile((blogs)=>{
            const exisitingBlog = blogs.find((blog)=> blog.id === id)
            blogCallback(exisitingBlog)
        })

    }

    static deleteBlog(id){
        getBlogsFromFile((blogs)=>{
            const updatedBlogs = blogs.filter(blog => blog.id !== id)
            fs.writeFile(filepath, JSON.stringify(updatedBlogs), err=>{
                if(!err){
                    Favourites.removeFavourites(id)
                }
            })
        })
    }
}