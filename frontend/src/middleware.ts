import { NextResponse, type NextRequest } from "next/server";

import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const response = await auth0.middleware(request);

  // 認証ルートはAuth0に処理を委譲
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return response;
  }

  // ルートは認証不要
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // セッションチェック
  const session = await auth0.getSession(request);
  if (!session) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?returnTo=${request.nextUrl.pathname}`,
        request.nextUrl.origin
      )
    );
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
