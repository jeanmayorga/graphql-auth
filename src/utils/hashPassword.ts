import bcrypt from 'bcryptjs';

export async function hashPasswordHook(user: any) {
  if (!user.changed('password')) return;
  user.password = await bcrypt.hash(user.password, 10);
}
