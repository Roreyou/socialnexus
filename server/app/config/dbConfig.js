module.exports = {
    HOST: 'localhost',
    USER: "root",
     PASSWORD: '0921',//记得修改本地数据库密码
    //PASSWORD: 'byc12138',//记得修改本地数据库密码
    DB: "socialnexus",
    //DB:"bycsql",
    port:3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  