import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Missing GitHub OAuth env vars", { status: 500 });
  }

  const code = req.nextUrl.searchParams.get("code");
  if (!code) return new NextResponse("Missing code", { status: 400 });

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const tokenData = await tokenRes.json();
  const token = tokenData.access_token;

  if (!token) {
    return new NextResponse("GitHub OAuth failed", { status: 400 });
  }

  // Invia il token al CMS tramite postMessage
  const html = `<!DOCTYPE html>
<html>
<body>
<script>
  window.opener.postMessage(
    'authorization:github:success:${JSON.stringify({ token, provider: "github" })}',
    '*'
  );
  window.close();
</script>
</body>
</html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
