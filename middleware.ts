import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPath = path === "/login" || path.startsWith("/reset-pass");

  const token = request.cookies.get("tic")?.value || "";

  if (!token && !isPath) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (token && isPath) {
    console.log("Redirecting to /");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
