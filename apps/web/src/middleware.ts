import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const cspHeader = `
    script-src 'self' 'nonce-${nonce}'
`;
    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, " ")
        .trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);

    requestHeaders.set(
        "Content-Security-Policy",
        contentSecurityPolicyHeaderValue
    );

    const response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
    response.headers.set(
        "Content-Security-Policy",
        contentSecurityPolicyHeaderValue
    );

    return response;
}
