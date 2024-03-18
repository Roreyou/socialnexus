const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const activityRouter = require('./app/routes/test_route')

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

app.use('/activity', activityRouter)

// 设置监听端口
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`服务器运行端口： ${PORT}.`);
});
