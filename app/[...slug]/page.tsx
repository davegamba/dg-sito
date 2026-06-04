import { redirect } from "next/navigation";

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  redirect(`https://davegamba.podia.com/${path}`);
}
