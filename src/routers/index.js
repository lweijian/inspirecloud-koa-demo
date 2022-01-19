const Router = require('@koa/router');
const router=new Router({prefix:'/api'})

const userRouter = require('./user');
const todoRouter = require('./todo');
const fileRouter=require('./file')
router.use(userRouter.routes());
router.use(todoRouter.routes());
router.use(fileRouter.routes());
router.get('/test',function (ctx) {
    ctx.body='test'
})
module.exports=router;
