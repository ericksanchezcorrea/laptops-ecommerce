import { sequelize } from "../database/database.js";
import { Sequelize, DataTypes } from "sequelize";
import { ShoppingCart } from "./ShoppingCart.js";

export const Laptop = sequelize.define('Laptop', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false
  },
  width: {
    type: DataTypes.STRING,
    allowNull: false
  },
  offert: {
    type: DataTypes.FLOAT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  processor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type_of_hard_drive: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hard_drive_capacity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ram: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wi_fi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resolution: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position4: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position5: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
}, 
{ timestamps: false }
);

  
// Laptop.belongsToMany(ShoppingCart, { through: 'ShoppingCartLaptop' });
// ShoppingCart.belongsToMany(Laptop, { through: 'ShoppingCartLaptop' });

export const ShoppingCartLaptop = sequelize.define('ShoppingCartLaptop', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Laptop.belongsToMany(ShoppingCart, {
  through: ShoppingCartLaptop,
  foreignKey: 'laptopId',
});

ShoppingCart.belongsToMany(Laptop, {
  through: ShoppingCartLaptop,
  foreignKey: 'shoppingCartId',
});

ShoppingCartLaptop.belongsTo(Laptop, { foreignKey: 'laptopId' });
ShoppingCartLaptop.belongsTo(ShoppingCart, { foreignKey: 'shoppingCartId' });