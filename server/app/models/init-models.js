var DataTypes = require("sequelize").DataTypes;
var _activity = require("./activity");
var _activity_type = require("./activity_type");
var _comment = require("./comment");
var _community = require("./community");
var _datawall_act = require("./datawall_act");
var _datawall_com = require("./datawall_com");
var _favorate = require("./favorate");
var _key_words = require("./key_words");
var _likepost = require("./likepost");
var _post = require("./post");
var _reply = require("./reply");
var _school = require("./school");
var _schoolteam = require("./schoolteam");
var _teacher = require("./teacher");
var _teamactivity = require("./teamactivity");
var _teammember = require("./teammember");

function initModels(sequelize) {
  var activity = _activity(sequelize, DataTypes);
  var activity_type = _activity_type(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var community = _community(sequelize, DataTypes);
  var datawall_act = _datawall_act(sequelize, DataTypes);
  var datawall_com = _datawall_com(sequelize, DataTypes);
  var favorate = _favorate(sequelize, DataTypes);
  var key_words = _key_words(sequelize, DataTypes);
  var likepost = _likepost(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var reply = _reply(sequelize, DataTypes);
  var school = _school(sequelize, DataTypes);
  var schoolteam = _schoolteam(sequelize, DataTypes);
  var teacher = _teacher(sequelize, DataTypes);
  var teamactivity = _teamactivity(sequelize, DataTypes);
  var teammember = _teammember(sequelize, DataTypes);


  return {
    activity,
    activity_type,
    comment,
    community,
    datawall_act,
    datawall_com,
    favorate,
    key_words,
    likepost,
    post,
    reply,
    school,
    schoolteam,
    teacher,
    teamactivity,
    teammember,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
