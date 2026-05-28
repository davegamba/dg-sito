import { redirect } from "next/navigation";

// In produzione lo Studio è su sanity.io/manage oppure con `npm run studio`
// In sviluppo: http://localhost:3333
export default function StudioPage() {
  redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333"
      : "https://sanity.io/manage"
  );
}
