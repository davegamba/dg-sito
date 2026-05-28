import { defineType, defineField } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "Articolo",
  type: "document",
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ─── CONTENUTO ───────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      group: "content",
      validation: (R) => R.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Introduzione / TL;DR",
      type: "text",
      rows: 3,
      group: "content",
      description: "Appare in lista articoli e come TL;DR",
      validation: (R) => R.max(300),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Allenamento", value: "allenamento" },
          { title: "Nutrizione", value: "nutrizione" },
          { title: "Mentalità", value: "mentalita" },
          { title: "Testosterone & Ormoni", value: "ormoni" },
          { title: "Longevità", value: "longevita" },
          { title: "Cardio", value: "cardio" },
        ],
      },
    }),
    defineField({
      name: "readTime",
      title: "Tempo di lettura (minuti)",
      type: "number",
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Data pubblicazione",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "coverImage",
      title: "Immagine copertina",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo (SEO)",
          type: "string",
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Corpo dell'articolo",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragrafo", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Citazione", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Grassetto", value: "strong" },
              { title: "Corsivo", value: "em" },
              { title: "Codice", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Apri in nuova tab" },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Testo alternativo" },
            { name: "caption", type: "string", title: "Didascalia" },
          ],
        },
        {
          name: "callout",
          title: "Box evidenziato",
          type: "object",
          fields: [
            { name: "text", type: "text", title: "Testo" },
            {
              name: "type",
              type: "string",
              title: "Tipo",
              options: {
                list: [
                  { title: "Info (ciano)", value: "info" },
                  { title: "Avviso (oro)", value: "warning" },
                  { title: "Scienza (verde)", value: "science" },
                ],
              },
            },
          ],
        },
      ],
    }),

    // ─── SEO ─────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Max 60 caratteri. Se vuoto usa il titolo dell'articolo.",
          validation: (R) => R.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
          description: "Max 155 caratteri. Appare su Google.",
          validation: (R) => R.max(155),
        }),
        defineField({
          name: "ogImage",
          title: "Immagine Social (Open Graph)",
          type: "image",
          description: "1200×630px. Se vuota usa la copertina.",
        }),
        defineField({
          name: "noIndex",
          title: "Nascondi da Google",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "focusKeyword",
          title: "Keyword principale",
          type: "string",
          description: "La parola chiave per cui vuoi posizionarti (usata nel JSON-LD e per il tuo riferimento)",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
