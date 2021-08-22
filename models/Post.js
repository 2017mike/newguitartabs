const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Post extends Model { }

Post.init({
  //true for request, false its an offer
  body: DataTypes.STRING,
}, { sequelize, modelName: 'post' })

module.exports = Post