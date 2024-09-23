import { LoginResponse } from "@/types/auth";
import Credentials from "@auth/core/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth"

export const authConfig = {
	trustHost: true,
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30,
	},
	secret: process.env.AUTH_SECRET,
	providers: [
		Credentials({
			credentials: {
				email: {label: "Email", type: "text"},
				password: {label: "Password", type: "password"},
			},
			async authorize({email, password}) {
				try {
					
					//validate credentials with api
					// const response = await api.post('/auth/login', {
					// 	json: {email, password}
					// }).json<ApiResponse<LoginResponse>>();
					// if (!response.success) {
					// 	return null
					// }
					// return response.data as any;
					
					// for testing purposes
					if (email !== 'test@example.com' || password !== 'P@ssw0rd123') {
						return null;
					}
					
					return {
						userId: '1',
						firstName: 'John',
						lastName: 'Doe',
						email: email as string,
						accessToken: 'test-access-token',
						image: 'https://avatars.githubusercontent.com/u/4364387?v=4',
					}
					
				} catch (error) {
					return null
				}
			}
		}),
	],
	callbacks: {
		async jwt({token, user}) {
			
			if (user) {
				const currentUser = user as LoginResponse;
				token.email = currentUser.email;
				token.userId = currentUser.userId;
				token.firstName = currentUser.firstName;
				token.lastName = currentUser.lastName;
				token.accessToken = currentUser.accessToken;
			}
			return token
		},
		async session({session, token, user}) {
			
			if (token) {
				session.user = {
					...session.user,
					email: token.email,
					userId: token.userId,
					firstName: token.firstName,
					lastName: token.lastName,
					accessToken: token.accessToken,
				};
			}
			
			return session;
		},
	},
} satisfies NextAuthConfig

export const {
	handlers: {GET, POST},
	signIn,
	signOut,
	auth
} = NextAuth({
	...authConfig
})