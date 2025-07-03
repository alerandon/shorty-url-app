import { Model, DataTypes, Sequelize } from 'sequelize';
import { nanoid } from 'nanoid';

class Url extends Model {
  declare id: string;
  declare originalUrl: string;
  declare shortCode: string;
  declare visitCount: number;
  declare guestId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initUserModel(sequelize: Sequelize) {
  Url.init(
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
      guestId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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

export default Url;
