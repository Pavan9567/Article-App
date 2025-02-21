import { NextResponse } from "next/server";

export function middleware(req) {
    const response = NextResponse.next();

    response.headers.append("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");

    response.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    response.headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return response;
}