import { api, ApiResponse, ErrorResponse } from "@/lib/api";
import { HTTPError } from "ky";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
	params: {
		slug: string[]
	},
}

export async function GET(
	req: NextRequest,
	context: RouteContext,
): Promise<Response> {
	const path = context.params.slug.join('/');
	const searchParams = req.nextUrl.searchParams.toString();
	const url = `${path}?${searchParams}`;
	
	try {
		const response = await api.get(url);
		const data = await response.json<ApiResponse<any>>()
		return NextResponse.json(data, {status: response.status});
	} catch (error) {
		if (error instanceof HTTPError) {
			const {response} = error;
			const data = await response.json<ErrorResponse<any>>()
			return NextResponse.json(data, {status: response.status});
		}
		return NextResponse.json({message: 'An error occurred'}, {status: 500});
	}
}

export async function PUT(
	req: NextRequest,
	context: RouteContext,
): Promise<Response> {
	const path = context.params.slug.join('/');
	const searchParams = req.nextUrl.searchParams.toString();
	const url = `${path}?${searchParams}`;
	
	try {
		const body = await req.json();
		const response = await api.put(url, body);
		const data = await response.json<ApiResponse<any>>()
		return NextResponse.json(data, {status: response.status});
	} catch (error) {
		if (error instanceof HTTPError) {
			const {response} = error;
			const data = await response.json<ErrorResponse<any>>()
			return NextResponse.json(data, {status: response.status});
		}
		return NextResponse.json({message: 'An error occurred'}, {status: 500});
	}
}