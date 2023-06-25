import { sequelize } from "../database/database.js";
import { Sequelize ,DataTypes } from "sequelize";

export const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference:{
        type: DataTypes.STRING,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }
);
