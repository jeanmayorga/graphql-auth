import { Model, Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}
