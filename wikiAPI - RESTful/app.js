//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

// request targeting all articles
app.route("/articles")

.get(function(req, res){
    Article.find(function(err, results){
        if(!err){
            console.log(results);
        res.send(results);
        } else {
            res.send(err);
        }
        
    })
})

.post(function(req, res){  
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    newArticle.save()(function(err){
        if(!err) {
            res.send("added the article.")
        } else{
            res.send(err);
        }
    });
})

.delete(function(req, res){
    Article.deleteMany(function(err){
        if (!err){
            res.send("deleted al articles");
        } else {
            res.send(err);
        }
    })
});


// // request targeting a specific articles
app.route("/articles/:articleTitle")

.get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, result){
        if(result){
            res.send(result);
        } else {
            res.send("NO article matching that title was found.")
        }
    })
})

// updating the content of the article-
.put(function(req, res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err){
            if(!err){
                res.send("updated successfully");
            } else {
                res.send(err);
            }
        }
    )
})

// using patch method to update the particular part
.patch(function(req, res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err){
        if(!err){
            res.send("successfully updated")
        } else{
            res.send(err);
        }
    }
    );
})

.delete(function(req,res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("deleted the article");
            } else {
                res.send(err);
            }
        }
    )
})


//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});