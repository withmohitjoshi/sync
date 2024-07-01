import { z, ZodType } from 'zod';
import { LoginFormInitialValuesT } from './types';

export const initialValues: LoginFormInitialValuesT = {
  email: '',
  password: '',
};
export const loginSchema: ZodType<LoginFormInitialValuesT> = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
