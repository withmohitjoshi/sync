import { z, ZodType } from 'zod';
import { VerifyEmailFormInitialValuesT } from './types';

export const initialValues: VerifyEmailFormInitialValuesT = {
  code: '',
};

export const verifyEmailSchema: ZodType<VerifyEmailFormInitialValuesT> = z.object({
  code: z.string().max(6).min(6),
});
