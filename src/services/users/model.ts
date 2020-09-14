import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../../database';
import { hashPasswordHook } from '../../utils';

import { UserInstance } from './interface';

export const User = db.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      set(value: string) {
        this.setDataValue('email', value.trim());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      set(value: string) {
        this.setDataValue('firstName', value.trim());
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      set(value: string) {
        this.setDataValue('lastName', value.trim());
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    freezeTableName: true,
    timestamps: true,
    modelName: 'User',
    hooks: {
      beforeCreate: hashPasswordHook,
      beforeUpdate: hashPasswordHook,
    },
  },
);
