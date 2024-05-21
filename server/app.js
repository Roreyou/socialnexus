// 导入所需模块
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// 创建 Express 应用
const app = express();

// 导入日志记录模块
const morgan = require("morgan");

// 设置 CORS 选项
const corsOptions = {
  origin: "*"
};

// 使用 CORS 中间件
app.use(cors(corsOptions));

// 使用 bodyParser 解析 JSON 请求体
app.use(bodyParser.json());

// 使用 bodyParser 解析 URL 编码的请求体
app.use(bodyParser.urlencoded({ extended: true }));

// 使用 Morgan 中间件记录请求信息
app.use(morgan("dev"));

// 简单路由
app.get("/", (req, res) => {
  res.json({ message: "欢迎访问我们的后端服务器" });
});

// 导入路由模块
const communityRouter = require('./app/routes/communityRouter');
const authRouter = require('./app/routes/authRouter');
const teamRouter = require('./app/routes/teamRouter');
const schoolRouter = require('./app/routes/schoolRouter');
const imageRouter = require('./app/routes/imageRouter');

// 使用路由
app.use('/auth', authRouter);
app.use('/community', communityRouter);
app.use('/school', schoolRouter);
app.use('/schoolteam', teamRouter);
app.use('/uploadImage', imageRouter);

// 设置监听端口
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`服务器运行端口： ${PORT}.`);
});