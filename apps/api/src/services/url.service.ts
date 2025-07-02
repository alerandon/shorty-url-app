import User from '../models/url.model';
import {
  createUserSchema,
  TCreateUserInput,
  TUpdateUserInput,
  updateUserSchema,
} from '../schemas/url.schema';

export async function getAllUsers() {
  return await User.findAll();
}

export async function getUserById(id: string) {
  return await User.findByPk(id);
}

export async function createUser(data: TCreateUserInput) {
  const validatedData = createUserSchema.parse(data);
  return await User.create(validatedData);
}

export async function updateUser(id: string, data: TUpdateUserInput) {
  const validatedData = updateUserSchema.parse(data);
  const user = await User.findByPk(id);
  if (!user) return null;
  return await user.update(validatedData);
}

export async function deleteUser(id: string) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
}
