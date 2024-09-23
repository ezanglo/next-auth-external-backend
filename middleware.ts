import { auth } from "@/auth";

export default auth((req) => {
	const {nextUrl, auth} = req;
	const isLoggedIn = !!auth
	
	const isLoginPage = nextUrl.pathname.startsWith('/login')
	const isProtectedRoute = nextUrl.pathname === '/'
	
	if (!isLoggedIn && isProtectedRoute) {
		return Response.redirect(new URL('/login', req.nextUrl))
	}
	
	if (isLoggedIn && isLoginPage) {
		return Response.redirect(new URL('/', req.nextUrl))
	}
	
})

export const config = {
	matcher: ['/((?!api|images|_next/static|_next/image|favicon.ico).*)']
}