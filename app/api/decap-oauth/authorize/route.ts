import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) return new NextResponse("Missing GITHUB_CLIENT_ID", { status: 500 });

  const { searchParams } = req.nextUrl;
  const scope = searchParams.get("scope") ?? "repo,user";

  const params = new URLSearchParams({
    client_id: clientId,
    scope,
    redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/decap-oauth/callback`,
  });

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
