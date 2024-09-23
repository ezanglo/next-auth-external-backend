"use server";

import { signIn, signOut } from "@/auth";
import { LoginFormSchema } from "@/components/forms/login-form";
import { AuthError } from "next-auth";

export async function login(payload: LoginFormSchema) {
	try {
		await signIn('credentials', {
			email: payload.email,
			password: payload.password,
			redirectTo: '/'
		})
	} catch (error) {
		if (error instanceof AuthError) {
			let message = 'Something went wrong';
			if(error.type === 'CredentialsSignin') {
				message = 'Invalid credentials';
			}
			return { success: false, message }
		}
		throw error;
	}
}

export async function logout() {
	return signOut({redirectTo: '/login'})
}