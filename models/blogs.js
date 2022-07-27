const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const filepath = path.join(rootDir, "data", "posts.json")

const getBlogsFromFile=((callback)=>{
    fs.readFile(filepath, (err, fileContent)=>{
        if(err){
            callback([])
        }else{
            callback(JSON.parse(fileContent))
        }
    })
})

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
                const existingBlogIndex = blogs.findIndex((blog)=>{
                    blog.id === this.id
                })
                const allBlogs = [...blogs]
                allBlogs[existingBlogIndex] = this;
                fs.writeFile(filepath, JSON.stringify(allBlogs), (err)=>{
                    console.log(err)
                })
            }else{
                this.id = Math.random().toString()
                blogs.push(this)
                fs.watchFile(filepath, JSON.stringify(blogs), (err)=>{
                    console.log(err)
                })
            }
        })

    }
}