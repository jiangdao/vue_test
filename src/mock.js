// 使用 Mock
const Mock = require('mockjs')
const Random = Mock.Random
let Result={
    code: 200,
    msg: "操作成功",
    data: null
}

Mock.mock('/getCaptchaImg','post',()=>{
    Result.data={
        token: Random.string(32),
        captchaImg: Random.dataImage('90x40', 'Nps35s')
    }
    return Result
})

Mock.mock('/login','post',()=>{
    Result.code=200
    Result.msg="登录成功"
    return Result
})
