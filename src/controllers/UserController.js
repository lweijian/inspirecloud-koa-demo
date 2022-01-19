const UserService = require('../services/UserService');

/**
 * UserController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 用户信息的增删改查、登录注册功能
 */
class UserController {
    async current(ctx) {
        const result = await UserService.current(ctx)
        ctx.body = {result};
    }

    async register(ctx) {
        const {username, password } = ctx.request.body;
        const result = await UserService.register(ctx,username,password)
        ctx.body = {result};
    }


    async loginByPassword(ctx) {
        const {username, password } = ctx.request.body;

        const result = await UserService.loginByPassword(ctx,username,password)
        ctx.body = {result};
    }

    async loginByPhone(ctx) {
        const {phoneNumber, code } = ctx.request.body;

        const result = await UserService.loginByPhone(ctx,phoneNumber,code)
        ctx.body = {result};
    }

    async sendSMS(ctx) {
        const {phoneNumber,opts={}} = ctx.request.body;
        const result = await UserService.sendSMS(ctx,phoneNumber,opts)
        ctx.body = {result};
    }



    async changePassword(ctx) {
        const {newPassword} = ctx.request.body;
        const result = await UserService.changePassword(ctx,newPassword)
        ctx.body = {result};
    }
    async updateOne(ctx) {
        const {user} = ctx.request.body;
        const result = await UserService.updateOne(ctx,user)
        ctx.body = {result};
    }


    async logout(ctx) {
        const result = await UserService.logout(ctx)
        ctx.body = {result};
    }
}

// 导出 Controller 的实例
module.exports = new UserController();
