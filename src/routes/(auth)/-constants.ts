import { m } from '@/paraglide/messages';

export const authErrorCodes = ['VALIDATION_ERROR'] as const;

export const errorMessages = {
  VALIDATION_ERROR: m.sign_up_error_VALIDATION_ERROR(),
} as const;
