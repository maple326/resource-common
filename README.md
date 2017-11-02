<p align="center">
    <a href="https://vuejs.org" target="_blank"><img width="100"src="https://vuejs.org/images/logo.png"></a>
    <br/>
    <br/>
    <h1>网校项目－前端构建系统</h1>
    <p>
	    该构建系统基于node.js webpack 实现。目前推荐项目使用Vue、ES6，如果对IE8兼容则不使用Vue，可使用传统的jQuery,ES6,PUG模板
    <p>
</p>



<h2 align="center">安装</h2>
<p>在根目录、webpack目录下分别安装依赖包</p>
```bash
npm install
```
### js文件的编译方法及参数说明

```bash
node build demo-app:dev js1 js2 js3 ...
// node build demo-app:dev
```
|项目名称|平台|打包模式|需打包的入口文件|
|:--:|:----:|:----------|:----------|
|demo/app|app/pc|dev/prod|不写会打包项目src/js/根目录下的所有文件|

### 项目目录结构
<p>参照 demo 下的目录结构，node build demo-app:dev index 会编译demo/app/src/js/根目录下的所有JS文件，所以这个目录下只放入口文件，以免被误编译，命令执行成功后会相应的生成到dist目录下，启动方式 localhost:8080</p>
  <br>
  <br>
    <br>
  <br>
    <br>
  <br>
    <br>
  <br>
    <br>
  <br>
    <br>
  <br>