const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes/index");
const dotenv = require("dotenv");
const path = require("path");
app.use(cors())// const userRoute = require("./controllers/users")
// const postRoute = require("./controllers/posts")
// const categoryRoute = require("./controllers/categories")
const multer = require("multer")


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', routes)


app.use("/images", express.static(path.join(__dirname, "/images")));
 //app.use("/api/auth",authRoute);
// app.use("/api/users",userRoute);
// app.use("/api/posts",postRoute);
// app.use("/api/categories",categoryRoute);

//STORAGE - MULTER
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"images")
    },filename:(req,file,cb)=>{
      cb(null,req.body.name);
    }
  })

  const upload = multer({storage:storage});
  app.post("/api/upload",upload.single("file"),(req,res)=>{
    return res.status(200).send("File has been uploaded");
  })


module.exports = app