"use strict";

import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/_not-found", "/", "/feed", "/perfil/:page*"],
};

export async function middleware(req: NextRequest, res: NextApiResponse) {
  const token = req.cookies.get("token") as unknown as any;
  if (token) {
    const url = req.nextUrl.clone();
    if (url.pathname === "/") {
      url.pathname = "/feed";
      return NextResponse.rewrite(url, { status: 307 });
    }
    return NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url, { status: 307 });
  }
}
