# prjKeybox
钥匙箱管理系统 laravel+dhtmlx

访问主页：http://139.196.213.122/

文件说明：

prjKeybox：网页端工程代码

+---app

|  +---Console

|  +---Exceptions 异常处理

|  +---Http

|  |  +---Controllers 控制器（业务操作）

|  |  |  +---BorrowReturn 借还模块

|  |  |  +---ClientAuth 身份认证

|  |  |  +---Hardware 硬件相关

|  |  |  +---HookManage 挂钩管理模块

|  |  |  +---KeyboxManage 钥匙箱管理模块

|  |  |  \---KeyWarehouse 钥匙库模块

|  |  \---Middleware 中间件

|  +---Models 模型（与数据表关联）

|  \---Providers 服务提供

+---public 入口文件

|  +---css

|  +---fonts

|  |  \---vendor

|  |    +---@mdi

|  |    \---dhx-suite

|  |      \---codebase

|  \---js

+---resources 页面

|  +---css

|  +---img

|  +---js

|  |  +---AboutUs 关于我们

|  |  +---BorrowReturnManager 借还模块

|  |  +---JournalsManager 挂钩管理

|  |  +---KeyboxesManager 钥匙箱管理

|  |  \---KeysManager 钥匙管理

|  +---lang

|  |  \---en

|  \---views

\---routes 路由



keybox.sql数据库脚本



globalPackages dhtmlx依赖包

