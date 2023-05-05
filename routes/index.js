const {
  register,
  checkPassword,
  queryId,
} = require('../controller/user')
const jwt = require('jsonwebtoken')
const Promise = require("bluebird");
const verify = Promise.promisify(jwt.verify);
const SECRET = "TEST_SECRET"

const { SuccessModel, ErrorModel } = require("../model/resModel")
const router = require('koa-router')()


router.get('/', async (ctx, next) => {
  console.log("process.env.BUILD_ENV", process.env.BUILD_ENV)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/register', async function (ctx, next) {
  const body = ctx.request.body
  const data = await register(body)
  ctx.body = new SuccessModel({
    ...data,
    message: "注册成功"
  })
})

router.post('/login', async function (ctx, next) {
  const body = ctx.request.body
  const isErr =  await checkPassword(body)
  if (isErr) {
    console.log("执行了")
    ctx.body = new ErrorModel(null, "用户名和密码有误")
    return;
  }
  let payload = {
    username:body.username,
    time:new Date().getTime(),
    timeout:1000*60*60*20000
  }
  let token = jwt.sign(payload, SECRET);
  ctx.body = new SuccessModel({
    token
  }, "登录成功")
})

router.get('/queryUserId', async function (ctx, next) {
  let token = ctx.request.headers["authorization"];
  let payload = await verify(token, SECRET);
  const userId = await queryId(payload.username);
  ctx.body = new SuccessModel({
    userId
  })
})


module.exports = router
