const fileService = require('../services/FileService');

/**
 * fileController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 文件系统控制器
 */
class FileController {
    async upload(ctx) {
        const { originalname:name, buffer} = ctx.request.file;
        const result = await fileService.upload(ctx,{name,buffer})
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
