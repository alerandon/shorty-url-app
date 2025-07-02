import { Model, DataTypes, Sequelize } from 'sequelize';
import argon2 from 'argon2';

class User extends Model {
  declare id: string;
  declare originalUrl: string;
  declare shortCode: string;
  declare visitCount: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      originalUrl: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      shortCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      visitCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Url',
      tableName: 'urls',
      timestamps: true,
    },
  );
}

export default User;
