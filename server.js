//Required Packages
const express = require('express');
const mongoose= require('mongoose');
const path = require('path');
const cors = require('cors'); 
var multer = require('multer');
const tokenGenerator = require('token-generator');
const GridFsStorage = require('multer-gridfs-storage');
const sslRedirect  = require('heroku-ssl-redirect').default;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sslRedirect());
//Setting port for live project
const port = process.env.PORT || 3001;
let gfs;
//Setting up MongooseDB connectionn
mongoose.Promise = global.Promise;
//const url = 'mongodb://localhost:27017/whitewiz_blog';
const url = 'mongodb+srv://newDbUser:joker123@cluster0.2yseg.mongodb.net/whitewiz_blog';
const mongoConfig = {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}
mongoose.connect(url,mongoConfig,
    function(error){
        let db = mongoose.connection.db;
        console.log("MongoDB Connected" ,url);
        gfs = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "post_images"
          });
          /*gfs = Grid(db, mongoose.mongo);
          gfs.collection('post_images'); */
});

//Moongoose Schemas
const userSchema = mongoose.Schema({
    Name : String,
    username : String,
    about : String,
    blogtitle : String,
    quote: String,
    pass :String,
    token : String
});
const postSchema = mongoose.Schema({
    AuthorId : String,
    Author : String,
    PostTitle : String,
    PostDetail :String,
    Image : String,
    Type: String,
    TempImage : Object,
    PubDate : Date
});
const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

const storage = new GridFsStorage({
    url: url,
    options : mongoConfig,
    file: (req, file) => {
      return new Promise((resolve, reject) => {  
        const filename = "IMAGE-"+new Date().getTime()+ path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'post_images'
        }
        resolve(fileInfo); 
      });
    }
  });

var save_post = multer({ storage: storage });

//Setting up Token Generator
var TokenGenerator = tokenGenerator({
    salt: '1234567891011',
    timestampMap: 'abcdefghij', // 10 chars array for obfuscation proposes
});
//-------Build Code (Server React pages)------
const publicPath  = path.join(__dirname, 'client/build');
app.use(express.static(publicPath));
//-------Build Code End------

//-------Get methods---------
app.get('/', function (req, res) {
       res.sendFile(path.join(publicPath, 'index.html'));
});
app.get('/loaderio-c4ccb0073a10df7cf837a490f6bfdc48',function(req,res){
    res.send("loaderio-c4ccb0073a10df7cf837a490f6bfdc48");
});
app.get('/get_image/:imgid',function(req,res){
    gfs.find({_id:mongoose.Types.ObjectId(req.params.imgid)}).toArray((err, files) => {
        var file = files[0];
        if (!file) {
        }else if (file.contentType === 'image/jpeg' ||file.contentType === 'image/png') {
            file.isImage = true;
        }else{
            file.isImage = false;
        }
        //const readstream = gfs.createReadStream({_id:file._id});
        //readstream.pipe(res);
        gfs.openDownloadStream(file._id).pipe(res);
    });
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

//-------Post methods-----------
app.post('/login',function(req,res){
    User.findOne({username:req.body.username},(err,doc)=>{
        if(doc!==null){
            if(req.body.pass === doc.pass){
                res.send(doc);
            }else{
                res.send(false);
            }
        }else{
            res.send(false);
        }
    });
});

app.post('/save_post',save_post.single('file'),function(req,res){
    User.findOne({token:req.body.token},(err,doc)=>{
        if(doc!==null){
            var fileId = null;
            if(req.file !== undefined)
                fileId = req.file.id;
            const newPost = new Post({
                AuthorId : doc._id,
                Author : doc.Name,
                PostTitle : req.body.PostTitle,
                PostDetail :req.body.PostDetail,
                Image : fileId,
                Type: req.body.Type,
                TempImage : null,
                PubDate : new Date()
            });
            newPost.save((err,doc)=>{
                if(err) return (console.log(err));
                res.send(doc); 
            });
        }
    });
});
async function getAllPosts(req,doc,cat){
   return new Promise(function(resolve,reject){
       if(cat ===null){
            return Post.find({},(err,posts)=>{
                if(posts.length === 0){
                resolve(posts);
                }
                var i=0;
                posts.forEach(async (post)=>{
                    post.Author = doc[0].Name;
                    /*post.TempImage = await getFullPost(req,doc,post);*/
                    if(i === posts.length-1)
                        resolve(posts);
                    i = i+1;
                });
            });
        }else{
            return Post.find({Type:cat},(err,posts)=>{
                if(posts.length === 0){
                resolve(posts);
                }
                var i=0;
                posts.forEach(async (post)=>{
                    post.Author = doc[0].Name;
                    if(i === posts.length-1)
                        resolve(posts);
                    i = i+1;
                });
            });
        }
    });
}
app.post('/load_posts',async function(req,res){
    await User.find({},async (err,doc)=>{
        if(doc.length){
            const posts = await getAllPosts(req,doc,req.body.cat);
            const fullRes = {
                /* about : doc[0].about,
                quote : doc[0].quote,
                blogtitle : doc[0].blogtitle,
                dash : dash,*/
                posts : posts
            }
            res.send(fullRes);
        }
    });
});
app.post('/load_blog',async function (req,res){
    await User.find({},async (err,doc)=>{
        if(doc.length){
            var dash;
            if(req.body.token === doc[0].token){
                dash = true;
            }else{
                dash = false;
            }
            const fullRes = {
                name : doc[0].Name,
                about : doc[0].about,
                quote : doc[0].quote,
                blogtitle : doc[0].blogtitle,
                dash : dash,
            }
            res.send(fullRes);
        }
    });
});
app.post('/load_data',function(req,res){
    User.findOne({token : req.body.token},(err,doc)=>{
        if(doc!==null){
            doc.pass = "";
            res.send(doc);
        }
    });
});
app.post('/update_data',function(req,res){
    User.findOne({token : req.body.token},(err,doc)=>{
        if(err) console.log(err);
        if(doc!==null){
            doc.Name = req.body.Name;
            doc.username = req.body.username;
            doc.about = req.body.about;
            doc.blogtitle = req.body.blogtitle;
            doc.quote = req.body.quote;
            doc.save().then(function(){
                res.send(doc);
            });
        }
    });
});
app.post('/delete_post',function(req,res){
    User.findOne({token:req.body.token},(err,doc)=>{
        if(doc!==null){
            Post.findOne({_id:req.body.id},(err,doc)=>{
                if(doc.Image !== null){
                    gfs.delete(mongoose.Types.ObjectId(doc.Image),function(err){
                        if (err) console.log(err);
                        doc.remove().then(function(){
                            res.send(true);
                        });
                    });
                }else{
                    doc.remove().then(function(){
                        res.send(true);
                    });
                }
            });
        }else{
            res.send(false);
        }
    });
});
app.post('/change_pass',function(req,res){
    User.findOne({token:req.body.token},(err,doc)=>{
        if(doc!==null){
            if(req.body.oldPass === doc.pass){
                doc.pass = req.body.newPass;
                doc.save().then(function(){
                    res.send(true);
                });
            }else{
                res.send(false);
            }
        }
    });
});
app.post('/check_auth',function(req,res){
    User.findOne({token:req.body.token},(err,doc)=>{
        if(doc!=null){
            const udata ={
                name : doc.Name,
                auth :true
            } 
            res.send(udata);
        }else
        {
            const udata ={
                name : "",
                auth :false
            } 
            res.send(udata);
        }
    });
});
app.listen(port,()=>{
    console.log("Server running at port : ",port);
});