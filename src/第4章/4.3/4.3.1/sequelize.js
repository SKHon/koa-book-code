const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('koadb', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = sequelize.define('tbl_user', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    }
},{
    timestamps: false
});

User.create({
  username: 'liujianghong2',
  nickname: '刘江虹2'
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
