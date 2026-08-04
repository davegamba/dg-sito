import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresha il token se sta per scadere — fondamentale per PWA
  await supabase.auth.getUser();

  return supabaseResponse;
}

// Solo le route che hanno davvero bisogno della sessione Supabase.
//
// Prima il matcher prendeva tutto tranne gli asset statici: ogni pageview del
// blog, ogni landing e perfino il webhook Stripe facevano una chiamata di rete
// a Supabase prima di rispondere, e le pagine statiche non potevano essere
// servite dalla CDN.
export const config = {
  matcher: ["/club/:path*", "/login", "/auth/:path*"],
};
