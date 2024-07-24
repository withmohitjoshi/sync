import { z, ZodType } from 'zod';
import { ForgotPasswordFormInitialValuesT } from './types';

export const initialValues: ForgotPasswordFormInitialValuesT = {
  email: '',
};
export const forgotPasswordSchema: ZodType<ForgotPasswordFormInitialValuesT> = z.object({
  email: z.string().email(),
});
