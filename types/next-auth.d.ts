import { type DefaultSession } from "next-auth"


declare module "@auth/core/jwt" {
	interface JWT {
		userId: string,
		email: string,
		firstName: string,
		lastName: string,
		accessToken: string,
	}
}


declare module "next-auth" {
	// Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	interface Session {
		user: DefaultSession["user"] & {
			userId: string,
			email: string,
			firstName: string,
			lastName: string,
			accessToken: string,
		}
	}
}