# 《<%= proname %>》
# 技术栈：vue+webpack

### 开发
##本地mock数据调试 
在mock目录下按照【下划线连接(a_b_c.json映射a/b/c接口)】命名规则配置相应json文件
``` bash
$ npm run mock
$ open http://0.0.0.0:8010/
```

##连接测试环境或mock平台调试开发 
config/config.js里appCfg.proxy配置需要映射的api地址及host
``` bash
$ npm run dev
$ open http://0.0.0.0:8010/
```
** PS:建议开启浏览器跨域模式直接跨域访问mock平台或测试环境接口
``` bash
$ open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

### 打包部署
``` bash
$ npm run build 
```

### 说明
--<%= proname %> 工程根目录
----config webpack编译配置
----src 源代码
------assets 小型静态资源文件(icon等)，大型静态资源建议上cdn
------constants 全局常量
------pages 页面根目录
--------common 全站公用视图组件
--------welcome 欢迎模块
------public 公共样式和插件
------routes 全站路由配置
------utils 工具
------mock 本地mock数据
------index.html 主模板
------index.js 主入口