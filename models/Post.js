const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Post extends Model { }

Post.init({
  //true for request, false its an offer
  song: DataTypes.STRING,
  artist: DataTypes.STRING,
  body: DataTypes.TEXT,
  isDraft: DataTypes.BOOLEAN

}, { sequelize, modelName: 'post' })

module.exports = Post