const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const jwtUtils = require('./app/utils/jwtUtils');
const jwtMiddleware = require('./app/middleware/jwtMiddleware');

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// content-type：application/json
app.use(bodyParser.json());

// content-type：application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 简单路由
app.get("/", (req, res) => {
  res.json({ message: "欢迎访问我们的后端服务器" });
});

// 获取路由
const communityRouter = require('./app/routes/communityRouter');
const authRouter = require('./app/routes/authRouter');
const teamRouter = require('./app/routes/teamRouter');

// 使用路由
app.use('/community', communityRouter)
app.use('/auth', authRouter)
console.log("debug 04");
app.use('/schoolteam',teamRouter)


// 设置监听端口
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`服务器运行端口： ${PORT}.`);
});
