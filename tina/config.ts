import { defineConfig } from "tinacms";

// One collection per page keeps each page's editing form focused on just
// that page's fields, rather than one giant "pages" collection where every
// document has to share the same schema. `ui.allowedActions` is turned off
// on all of these singletons so an editor can't accidentally create a
// second "home" or delete the only one.
// `router` tells the admin which live page URL to show in the preview pane
// next to the edit form — without it Tina has no page to render there.
const singleton = (name: string, routePath: string) => ({
  ui: {
    allowedActions: { create: false, delete: false },
    filename: {
      readonly: true,
      slugify: () => name,
    },
    router: () => routePath,
  },
});

const paragraphList = (label: string, name = "paragraphs") => ({
  type: "string" as const,
  name,
  label,
  list: true,
  ui: { component: "textarea" as const },
});

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Home Page",
        path: "content/pages",
        format: "json",
        match: { include: "home" },
        ...singleton("home", "/"),
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "highlight",
                label: "Highlighted word(s) at the end of the heading",
                description: 'e.g. "can\'t wait." — shown underlined',
              },
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
              { type: "string", name: "primaryButtonLabel", label: "Primary button label" },
              { type: "string", name: "secondaryButtonLabel", label: "Secondary button label" },
              { type: "image", name: "image", label: "Hero image" },
              { type: "string", name: "imageAlt", label: "Hero image alt text" },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Stat strip",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.figure }) },
            fields: [
              { type: "string", name: "figure", label: "Figure" },
              { type: "string", name: "label", label: "Label" },
            ],
          },
          {
            type: "object",
            name: "mission",
            label: "Mission section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              paragraphList("Paragraphs"),
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image alt text" },
            ],
          },
          {
            type: "object",
            name: "missionQuote",
            label: "Mission quote",
            fields: [
              { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
              { type: "string", name: "attribution", label: "Attribution" },
            ],
          },
          {
            type: "object",
            name: "help",
            label: "\"How we can help\" section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "linkLabel", label: "\"See everything\" link label" },
              {
                type: "object",
                name: "items",
                label: "Items (max 4 shown on homepage)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "newsSection",
            label: "\"From the news\" section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "linkLabel", label: "\"See all news\" link label" },
            ],
          },
          {
            type: "object",
            name: "valuesSection",
            label: "\"What we stand for\" section",
            fields: [{ type: "string", name: "heading", label: "Heading" }],
          },
          {
            type: "object",
            name: "cta",
            label: "Closing call to action",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
              { type: "string", name: "buttonLabel", label: "Button label" },
            ],
          },
        ],
      },
      {
        name: "whoWeArePage",
        label: "Who We Are Page",
        path: "content/pages",
        format: "json",
        match: { include: "who-we-are" },
        ...singleton("who-we-are", "/who-we-are"),
        fields: [
          {
            type: "object",
            name: "pageBand",
            label: "Page header",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "standfirst", label: "Standfirst", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "intro",
            label: "Intro section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              paragraphList("Paragraphs"),
            ],
          },
          {
            type: "object",
            name: "founders",
            label: "\"Meet the founders\" section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "standfirst", label: "Standfirst" },
            ],
          },
          {
            type: "object",
            name: "valuesSection",
            label: "\"What we stand for\" section",
            fields: [{ type: "string", name: "heading", label: "Heading" }],
          },
          {
            type: "object",
            name: "cta",
            label: "Closing call to action",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
              { type: "string", name: "buttonLabel", label: "Button label" },
            ],
          },
        ],
      },
      {
        name: "whatWeDoPage",
        label: "What We Do Page",
        path: "content/pages",
        format: "json",
        match: { include: "what-we-do" },
        ...singleton("what-we-do", "/what-we-do"),
        fields: [
          {
            type: "object",
            name: "pageBand",
            label: "Page header",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "standfirst", label: "Standfirst", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "intro",
            label: "Intro section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "quote", label: "Pull quote", ui: { component: "textarea" } },
          {
            type: "object",
            name: "supportAreas",
            label: "\"We can support you to\" section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "standfirst", label: "Standfirst" },
              paragraphList("Items", "items"),
            ],
          },
          {
            type: "object",
            name: "bespokeSupport",
            label: "\"Bespoke support can include\" section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              paragraphList("Items", "items"),
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Closing call to action",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
              { type: "string", name: "buttonLabel", label: "Button label" },
            ],
          },
        ],
      },
      {
        name: "ourWorkPage",
        label: "Our Work Page",
        path: "content/pages",
        format: "json",
        match: { include: "our-work" },
        ...singleton("our-work", "/our-work"),
        fields: [
          {
            type: "object",
            name: "pageBand",
            label: "Page header",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "standfirst", label: "Standfirst", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "intro",
            label: "Intro section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "trackRecord",
            label: "Track record list",
            fields: [paragraphList("Items", "items")],
          },
          {
            type: "object",
            name: "advisory",
            label: "Advisory group memberships",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "current",
                label: "Current",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
              {
                type: "object",
                name: "previous",
                label: "Previous",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "publicationsSection",
            label: "Publications",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "items",
                label: "Publications",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.citation }) },
                fields: [
                  { type: "string", name: "citation", label: "Citation" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "link", label: "Link (optional)" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "presentationsSection",
            label: "Presentations",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "items",
                label: "Presentations",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "presenter", label: "Presenter" },
                  { type: "string", name: "venue", label: "Venue", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Closing call to action",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
              { type: "string", name: "buttonLabel", label: "Button label" },
            ],
          },
        ],
      },
      {
        name: "getInTouchPage",
        label: "Get In Touch Page",
        path: "content/pages",
        format: "json",
        match: { include: "get-in-touch" },
        ...singleton("get-in-touch", "/get-in-touch"),
        fields: [
          {
            type: "object",
            name: "pageBand",
            label: "Page header",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "standfirst", label: "Standfirst", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "form",
            label: "Form section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "intro", label: "Intro", ui: { component: "textarea" } },
              { type: "string", name: "cardHeading", label: "\"Send us a message\" card heading" },
            ],
          },
          {
            type: "object",
            name: "contactRoutes",
            label: "Contact routes",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Email address" },
            ],
          },
          {
            type: "string",
            name: "legalNote",
            label: "Legal note",
            description:
              'Shown just above the page footer, followed automatically by a "privacy notice" link — don\'t include those words here.',
            ui: { component: "textarea" },
          },
        ],
      },
      {
        name: "privacyPage",
        label: "Privacy Page",
        path: "content/pages",
        format: "json",
        match: { include: "privacy" },
        ...singleton("privacy", "/privacy"),
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
          { type: "string", name: "lastUpdated", label: "Last updated line" },
        ],
      },
      {
        name: "siteSettings",
        label: "Site-wide Text",
        path: "content/pages",
        format: "json",
        match: { include: "site-settings" },
        ...singleton("site-settings", "/"),
        fields: [
          { type: "string", name: "footerBlurb", label: "Footer blurb", ui: { component: "textarea" } },
          { type: "string", name: "footerUncrcNote", label: "Footer UNCRC note", ui: { component: "textarea" } },
          { type: "string", name: "contactEmail", label: "Main contact email" },
          { type: "string", name: "companyLine", label: "Company/copyright line" },
        ],
      },
      {
        name: "team",
        label: "Founders",
        path: "content/team",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Name" },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "email", label: "Email" },
          { type: "image", name: "photo", label: "Photo" },
          { type: "string", name: "shortBio", label: "Short bio (card)", ui: { component: "textarea" } },
          paragraphList("Full bio (paragraphs)", "fullBio"),
        ],
        ui: {
          router: ({ document }) => `/who-we-are/${document._sys.filename}`,
        },
      },
      {
        name: "value",
        label: "Values",
        path: "content/values",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "strapline", label: "Strapline" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          {
            type: "string",
            name: "color",
            label: "Colour",
            options: ["navy", "coral", "teal", "amber"],
          },
          { type: "image", name: "image", label: "Icon" },
        ],
        ui: {
          router: () => "/",
        },
      },
      {
        name: "post",
        label: "News Posts",
        path: "content/posts",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "publishedAt", label: "Published date" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "image", name: "coverImage", label: "Cover image" },
          { type: "string", name: "coverAlt", label: "Cover image alt text" },
          paragraphList("Body (paragraphs)", "body"),
        ],
        ui: {
          router: ({ document }) => `/news/${document._sys.filename}`,
        },
      },
    ],
  },
});
