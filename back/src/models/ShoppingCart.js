import { sequelize } from "../database/database.js";
import { Sequelize, DataTypes } from "sequelize";

export const ShoppingCart = sequelize.define(
  "ShoppingCart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    total:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
