import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images/blog",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "blog",
        label: "Articoli Blog",
        path: "content/blog",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.title
                ?.toLowerCase()
                .replace(/[àáâãäå]/g, "a")
                .replace(/[èéêë]/g, "e")
                .replace(/[ìíîï]/g, "i")
                .replace(/[òóôõö]/g, "o")
                .replace(/[ùúûü]/g, "u")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "") || "",
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Data pubblicazione",
            description:
              "Se lo Stato è 'Programmato', l'articolo diventa visibile sul sito automaticamente da questa data.",
            required: true,
            ui: {
              dateFormat: "DD/MM/YYYY",
            },
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              "Allenamento",
              "Nutrizione",
              "Dimagrimento",
              "Testosterone",
              "Longevità",
              "Mindset",
              "Metodo BIM",
            ],
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt (TL;DR)",
            description: "Breve descrizione per SEO — max 155 caratteri",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Immagine copertina",
          },
          {
            type: "string",
            name: "status",
            label: "Stato",
            description:
              "Bozza = mai visibile. Programmato = diventa visibile in automatico alla Data pubblicazione. Pubblicato = visibile da subito (se la data non è nel futuro).",
            options: [
              { value: "bozza", label: "🔴 Bozza" },
              { value: "programmato", label: "🟡 Programmato" },
              { value: "pubblicato", label: "🟢 Pubblicato" },
            ],
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenuto",
            isBody: true,
          },
        ],
      },
    ],
  },
});
