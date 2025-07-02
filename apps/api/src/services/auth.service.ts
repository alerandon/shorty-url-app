import User from '../models/user.model';
import {
  loginSchema,
  registerSchema,
  TLoginInput,
  TRegisterInput,
} from '../schemas/auth.schema';

export async function login(data: TLoginInput) {
  const validatedData = loginSchema.parse(data);
  const errorMsg = 'Wrong credentials';

  const user = await User.findOne({ where: { email: validatedData.email } });
  if (!user) throw new Error(errorMsg);

  const validatedPassword = await user.validatePassword(validatedData.password);
  if (!validatedPassword) throw new Error(errorMsg);

  const token = user.generateAuthToken();
  const response = { data: { token, user } };
  return response;
}

export async function register(data: TRegisterInput): Promise<object> {
  const validatedData = registerSchema.parse(data);
  const errorMsg = 'There was an error registering the user';

  const existingUser = await User.findOne({
    where: { email: validatedData.email },
    attributes: ['id', 'email'],
  });

  if (existingUser) throw new Error(errorMsg);
  const user = await User.create(validatedData);
  const token = user.generateAuthToken();

  const response = { data: { token, user } };
  return response;
}
