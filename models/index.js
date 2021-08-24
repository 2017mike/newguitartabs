const User = require('./User.js')
const Post = require('./Post.js')
User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { foreignKey: 'uid' })

// your relationships go here...

module.exports = { User, Post }
