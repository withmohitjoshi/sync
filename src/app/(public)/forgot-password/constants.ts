import { z, ZodType } from 'zod';
import { ForgotPasswordFormInitialValuesT } from './types';
import { email } from '@/helpers/zodValidations';

export const initialValues: ForgotPasswordFormInitialValuesT = {
  email: '',
};
export const forgotPasswordSchema: ZodType<ForgotPasswordFormInitialValuesT> = z.object({
  email: email("Email"),
});
