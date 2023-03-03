const { DataTypes} = require("sequelize");
const sequelize =require(".")


const Drink = sequelize.define('drink', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    recipe: DataTypes.STRING,
},
{
  timestamp: true,
  paranoid: true
}
);

module.exports = Drink;
