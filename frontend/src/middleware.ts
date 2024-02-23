'use strict'

import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/_not-found",
    "/",
    "/feed"
  ],
};

export async function middleware(req: NextRequest, res: NextApiResponse) {
  const token = req.cookies.get("token") as unknown as any;
  console.log();
  
  if (token) {
    return NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url, { status: 307 });
  }
}
