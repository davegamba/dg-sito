// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/blog",
      publicFolder: "public"
    }
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
            slugify: (values) => values?.title?.toLowerCase().replace(/[àáâãäå]/g, "a").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i").replace(/[òóôõö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || ""
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Data pubblicazione",
            required: true,
            ui: {
              dateFormat: "DD/MM/YYYY"
            }
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
              "Longevit\xE0",
              "Metodo BIM"
            ]
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt (TL;DR)",
            description: "Breve descrizione per SEO \u2014 max 155 caratteri",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "image",
            label: "Immagine copertina"
          },
          {
            type: "boolean",
            name: "published",
            label: "Pubblicato"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenuto",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
