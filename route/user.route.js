var express=require('express');
var router=express.Router();
var authMiddleware=require('../middleware/auth.Middleware')

var controller= require('../controllers/user.controller')


router.get('/',controller.index)
router.get('/search',controller.search)
router.get('/create',controller.create)
router.get('/:id',controller.id)
router.post('/create',controller.postCreate)

module.exports = router;