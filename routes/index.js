const {Router} = require("express")
const authControl = require("../controllers/auth")
const userControl = require("../controllers/users")
const postControl = require("../controllers/posts")
const categoryControl = require("../controllers/categories")

const router = Router();

//REGISTRATION/LOGIN

router.get('/', (req, res) => res.send('This is the root!'))

router.post('/auth/register', authControl.registerUser)

router.post('/auth/login', authControl.loginUser)

//POST
router.post('/posts', postControl.createPost)
router.put('/posts/:id',postControl.updatePost)
router.delete('/posts/:id',postControl.deletePost)
router.get('/posts/:id',postControl.getPost)
router.get('/posts',postControl.getAllPosts)


//USER
router.get('/users/:id',userControl.getUser)
router.delete('/users/:id',userControl.deleteUser)
router.put('/users/:id',userControl.updateUser)

//CATEGORY
router.post('/categories',categoryControl.createCategory);
router.get('/categories',categoryControl.getAllCategories);


module.exports = router;