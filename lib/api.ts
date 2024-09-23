import { auth } from "@/auth";
import ky from "ky";

export type Pagination = {
	firstPage: number,
	currentPage: number,
	lastPage: number,
	previousPage?: number,
	nextPage?: number,
	itemsPerPage: number,
}

export type ApiResponse<T> = {
	totalCount: number,
	message: string,
	success: true,
	data: T,
	pagination?: Pagination
};

export type ErrorResponse<T> = {
	statusCode: number,
	success: false
	message: string,
	errors: {
		[K in keyof T]: string[]
	}
} | {
	success: false
	status: string,
	code: 500,
	reason: string,
	note: string
}

export const extendKy = () => {
	return ky.extend({
		prefixUrl: typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : '/api/backend',
		timeout: 30000,
		headers: {
			'Content-Type': 'application/json'
		},
		hooks: {
			beforeRequest: [
				async (request) => {
					if(typeof window !== 'undefined'){
						return;
					}
					
					const session = await auth();
					const currentUser = session?.user;
					if(currentUser) {
						request.headers.set('Authorization', `Bearer ${currentUser.accessToken}`)
					}
				}
			]
		}
	})
}

export const api = extendKy()