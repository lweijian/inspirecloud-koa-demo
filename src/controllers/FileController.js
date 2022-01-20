const fileService = require('../services/FileService');
const fs = require("fs");

/**
 * fileController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 用户信息的增删改查、登录注册功能
 */
class FileController {
    async upload(ctx) {
        // 请求 Content-Type 需要为 multipart/form-data
        const { file } = ctx.request.files;
        const buffer = fs.createReadStream(file.path);
        const result = await fileService.upload(ctx,{name:file.name,buffer})
        ctx.body = {result};
    }
    async delete(ctx) {
        const { url } = ctx.request.body;
        const result = await fileService.delete(ctx,url)
        ctx.body = {result};
    }

}

// 导出 Controller 的实例
module.exports = new FileController();
