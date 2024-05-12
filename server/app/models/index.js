const dbConfig = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.activity = require("./activity.js")(sequelize, Sequelize);
db.community = require("./community.js")(sequelize, Sequelize);
db.school=require("./school.js")(sequelize, Sequelize);
db.team=require("./schoolteam.js")(sequelize, Sequelize);
db.activity_type=require("./activity_type.js")(sequelize, Sequelize);
db.comment=require("./comment.js")(sequelize, Sequelize);
db.favorate=require("./favorate.js")(sequelize, Sequelize);//发现这里拼错了,yogi好尴尬
db.post=require("./post.js")(sequelize, Sequelize);
db.teamactivity=require("./teamactivity.js")(sequelize, Sequelize);
db.teammember=require("./teammember.js")(sequelize, Sequelize);
db.datawall_act=require("./datawall_act.js")(sequelize, Sequelize);
db.datawall_com=require("./datawall_com.js")(sequelize, Sequelize);
db.teacher=require("./teacher.js")(sequelize, Sequelize);
db.keywords=require("./key_words.js")(sequelize, Sequelize);
db.reply=require("./reply.js")(sequelize, Sequelize);
db.likepost=require("./likepost.js")(sequelize, Sequelize);
db.likecomment=require("./likecomment.js")(sequelize, Sequelize);
db.likereply=require("./likereply.js")(sequelize, Sequelize);
db.notification=require("./notification.js")(sequelize, Sequelize);
db.modify_teacher=require("./modify_teacher.js")(sequelize, Sequelize);
db.modify_teammember=require("./modify_teammember.js")(sequelize, Sequelize);


module.exports = db;