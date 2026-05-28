"use client";

// Questo file contiene TUTTO Sanity Studio — è solo client-side.
// Importato con dynamic({ ssr: false }) dalla route /studio.
import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const baseUrl =
  typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? "https://davegamba.com"
    : "http://localhost:3000";

const config = defineConfig({
  name: "davegamba",
  title: "DaveGamba.com",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenuti")
          .items([
            S.listItem()
              .title("📝 Articoli del blog")
              .schemaType("post")
              .child(
                S.documentList()
                  .title("Articoli")
                  .filter('_type == "post"')
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});

export default function SanityStudioClient() {
  return <NextStudio config={config} />;
}
