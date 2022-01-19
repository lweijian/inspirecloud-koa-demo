### 这些是写demo时遇到的问题点

### 轻服务具体使用还需要看官方文档：

### https://qingfuwu.cn/docs/nodejs/

### 用户系统注意点

##### 在请求头中携带 `token`

为了能让服务端正确区分不同的用户，从客户端发送请求时，你必须将标识用户唯一性的 `token` 携带在请求头的 `x-tt-session-v2` 中。`token` 可以是**任意字符串**，需要由开发者自行保证唯一性，建议可以采用 `UUID` 等方案。

要在请求头携带token，不然会有这个错误。

![image-20220118154837687](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220118154837687.png)

如果通过 @byteinspire/js-sdk JavaScript SDK 请求**云函数**，会自动设置 **token**。所以，如果是

在客户端用js-sdk使用用户系统，则不需要设置token，否则需要。





说明一下：这个token跟user没有**强相关**，如果丢失了，可以再次生成另一个唯一的值作为token

用户登录需要用到这个token，登录成功之后，这个token会关联到这个登录成功的用户。

登录之后的一些操作，比如登出，修改用户信息，获取用户信息等，是根据这个token来识别用户身份的。如果token丢失了，可以由客户端再生成一个token，用于登录，使这个token与用户产生新的关联。



下面是官方文档的使用建议

```javascript
// 前端（即客户端）中发送请求的示例代码
const uuid = require('uuid/v1');
const axios = require('axios');

const localSessionKey = `light:${serviceId}:local-session`;

if (!localStorage.get(localSessionKey)) {
  // 如果本地没有 token，则随机生成
  localStorage.set(localSessionKey, uuid());
}

axios.post(
  '[服务端的 URL 地址]',
  {
    phone: '123456789'  // 发送用户的手机号作为参数
  },
  {
    headers: {
      // 请求头中需要设置 x-tt-session-v2，才能在服务端使用用户系统
      'x-tt-session-v2': localStorage.get(localSessionKey)
    }
  }
).then((res) => {
  // 请求成功
}).catch((err) => {
  // 请求失败
});
```

### 文件系统注意点

如果是使用云工程，用koa-body解析上传文件，则需要注意。

当使用koa-body解析的请求体，它会在解析之后把文件保存到了本地。

如果想要获取文件内容，还需要使用fs模块读取，并上传到轻服务的数据库。如果是自己的服务器就不需要了，可以直接用file.path,来访问文件。

```js
//客户端
 this.file = this.$refs.fileId.files[0]
  const suffix=this.file.name.split('.')[1]
    const formData = new FormData();
	formData.append('file', this.file,`${uuid.v1()}.${suffix}`);
     await window.axios.post('路径', formData, 
                    {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                });
           


//服务器端
// 请求 Content-Type 需要为 multipart/form-data
const { file } = ctx.request.files;
const buffer = fs.readFileSync(file.path);
const result = await fileService.upload(ctx,{name:file.name,buffer})
ctx.body = {result};
```



### 测试注意点

命令行工具进行本地调试（inspirecloud dev）的时候，会注入调试用的凭证信息（相当于 accessKey，accessSecret 等凭证），脱离了轻服务工具运行会导致没有注入凭证信息。

所以本地环境测试需要获取轻服务注入的凭证，并手动配置环境。不然会导致jest测试报错，会有下面的错误。

![image-20220118172116569](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220118172116569.png)



可以通过运行时，打印一下环境变量 

![image-20220120011817448](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220120011817448.png)

获取 这三个字段的变量与值，然后通过cross-env配置测试环境的环境变量

![image-20220120012737093](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220120012737093.png)

这三个变量是轻服务注入的，不要暴露给其他人

```
INSPIRECLOUD_API_ENDPOINT: v1
INSPIRECLOUD_SERVICE_ID:v2
INSPIRECLOUD_SERVICE_SECRET:v3
```



然后npm 下载corss-env 的依赖，在package.json就可以配置脚本了，脚本需要注入上面三个变量的值

```
"scripts": {
    "dev-test": "cross-env  INSPIRECLOUD_API_ENDPOINT=v1  INSPIRECLOUD_SERVICE_ID=v2  INSPIRECLOUD_SERVICE_SECRET=v3 jest "
  },
```



## 安装轻服务 CLI

```sh
npm i -g @byteinspire/cli
```



## 本地开发项目

```sh
inspirecloud dev
```



## 部署项目至云端

```sh
inspirecloud deploy
```

或

```sh
inspirecloud deploy -m "Deploying a new feature."
```





### 官方支持群：

有问题可以去群问，他们很热心。

![larkgroup](https://lf3-static.bytednsdoc.com/obj/eden-cn/fuvazli/lark-group-blank.jpeg)

