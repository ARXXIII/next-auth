'use server';

import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { sendResetEmail } from '@/lib/mail';
import { getUserByEmail } from '@/data/user';
import { generateResetToken } from '@/lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const validatedFields = ResetSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid email!' };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: 'Email not found!' };
	}

	const passwordResetToken = await generateResetToken(email);

	await sendResetEmail(passwordResetToken.email, passwordResetToken.token);

	return { success: 'Reset email sent!' };
};
