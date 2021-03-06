const inspirecloud = require('@byteinspire/api');

/**
 * 用户业务
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
class UserService {

    /**
     * 获取当前用户状态
     * @param ctx
     * @return {Promise<any>} 返回实际插入数据库的数据，会增加_id，createdAt和updatedAt字段
     */
    async current(ctx) {
        try {
            const info = await inspirecloud.user.current(ctx);
            return {
                success: true,
                info
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }

    }

    /**
     * 通过密码注册
     * @return {Promise<any>}
     * @param ctx
     * @param username
     * @param password
     */
    async register(ctx, username, password) {

        try {

            const info = await inspirecloud.user.register(ctx, username, password);

            return {
                success: true,
                info
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }
    /**
     * 通过密码登录
     * @param ctx Koa 上下文
     * @param username 用户名
     * @param password 密码
     * @return {Promise<any>} 返
     */
    async loginByPassword(ctx, username, password) {

        try {
            const info = await inspirecloud.user.login(ctx, username, password);
            return {
                success: true,
                info
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }

    /**
     * 发送短信验证码
     * @param ctx Koa 上下文
     * @param phoneNumber
     * @param opts
     * @return {Promise<any>}
     */
    async sendSMS(ctx, phoneNumber,opts) {

        try {
            const info = await inspirecloud.user.sendSMS(ctx, phoneNumber,opts);
            return {
                success: true,
                info
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }
    /**
     * 修改登录密码
     * @param ctx Koa 上下文
     * @param newPassword
     * @return {Promise<any>}
     */
    async changePassword(ctx, newPassword) {

        try {
            const info = await inspirecloud.user.changePassword(ctx, newPassword);
            return {
                success: true,
                info
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }
    /**
     * 修改用户信息
     * @param ctx Koa 上下文
     * @param user 用户对象 用于信息更新
     * @return {Promise<any>}
     */
    async updateOne(ctx, user) {

        try {
            const info = await inspirecloud.user.updateOne(ctx, user);
            return {
                success: true,
                info
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }

    /**
     * 通过手机号码登录
     * @param ctx Koa 上下文
     * @param phoneNumber
     * @param code
     * @return {Promise<any>}
     */
    async loginByPhone(ctx, phoneNumber, code) {

        try {
            const info = await inspirecloud.user.loginByPhone(ctx, phoneNumber, code);
            return {
                success: true,
                info
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }

    /**
     * 登出
     * @return {Promise<any>} 返回实际插入数据库的数据，会增加_id，createdAt和updatedAt字段
     * @param ctx
     */
    async logout(ctx) {
        try {
            const data = await inspirecloud.user.logout(ctx);
            return {
                success: true,
                data
            };
        } catch (e) {
            return {
                success: false,
                message: e.message
            };
        }
    }

}
// 导出 Service 的实例
module.exports = new UserService();
