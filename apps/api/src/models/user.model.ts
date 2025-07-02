import { Model, DataTypes, Sequelize } from 'sequelize';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

class User extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  /**
   * Compara la contraseña ingresada con la almacenada en la BD.
   * @param password - Contraseña sin hash.
   * @returns {Promise<boolean>}
   */
  async validatePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }

  generateAuthToken() {
    const secret = process.env.JWT_SECRET!;
    const inputPayload = { id: this.id, email: this.email, type: 'auth' };
    const token = jwt.sign(inputPayload, secret, { expiresIn: '7 days' });
    return token;
  }

  generateResetToken() {
    const secret = process.env.JWT_SECRET!;
    const inputPayload = {
      id: this.id,
      email: this.email,
      type: 'reset-password',
    };
    const token = jwt.sign(inputPayload, secret, { expiresIn: '10 minutes' });
    return token;
  }
}

export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user: User) => {
          if (user.password) {
            user.password = await argon2.hash(user.password);
          }
        },
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            user.password = await argon2.hash(user.password);
          }
        },
      },
    },
  );
}

export default User;
