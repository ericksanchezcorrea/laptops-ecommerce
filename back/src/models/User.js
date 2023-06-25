import { sequelize } from "../database/database.js";
import { Sequelize ,DataTypes } from "sequelize";
import { Address } from './Address.js'
import { ShoppingCart } from './ShoppingCart.js'

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    dni: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    family_name: {
      type: DataTypes.STRING,
    },
    email:{
      type: DataTypes.STRING,
    },
    confirmationEmail:{
      type: DataTypes.STRING,
    },
    picture:{
      type: DataTypes.STRING,
    },
    phone:{
      type: DataTypes.INTEGER,
    },
    sub:{
      type: DataTypes.STRING,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isAdmin:{
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
);

User.hasMany(Address, { foreignKey: 'UserId' });
Address.belongsTo(User, { foreignKey: 'UserId' });

User.hasMany(ShoppingCart);
ShoppingCart.belongsTo(User);

Address.hasMany(ShoppingCart, { foreignKey: 'AddressId' });
ShoppingCart.belongsTo(Address, { foreignKey: 'AddressId' });