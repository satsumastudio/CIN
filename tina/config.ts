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

// What Google shows under the page title in search results. Optional:
// each page falls back to a sensible built-in description when blank.
const seoField = () => ({
  type: "object" as const,
  name: "seo",
  label: "Search engine listing",
  fields: [
    {
      type: "string" as const,
      name: "description",
      label: "Search description",
      description:
        "Shown under the page title in Google results and link previews. Aim for 120–155 characters. Leave blank to use the default.",
      ui: { component: "textarea" as const },
    },
  ],
});

// A section photo plus the description read out by screen readers.
const imageFields = (label = "Photo") => [
  { type: "image" as const, name: "image", label },
  {
    type: "string" as const,
    name: "imageAlt",
    label: `${label} description (alt text)`,
    description: "Describe what's in the photo for people using screen readers.",
  },
];

// Privacy and terms share one shape so they render through the same layout.
const legalPageFields = () => [
  { type: "string" as const, name: "title", label: "Title" },
  { type: "string" as const, name: "intro", label: "Introduction", ui: { component: "textarea" as const } },
  {
    type: "object" as const,
    name: "sections",
    label: "Sections",
    list: true,
    ui: { itemProps: (item: { heading?: string }) => ({ label: item?.heading }) },
    fields: [
      { type: "string" as const, name: "heading", label: "Heading" },
      paragraphList("Paragraphs"),
    ],
  },
  { type: "string" as const, name: "lastUpdated", label: "Last updated line" },
  seoField(),
];

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
          seoField(),
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
              ...imageFields(),
            ],
          },
          {
            type: "object",
            name: "founders",
            label: "\"Meet the founders\" section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "standfirst", label: "Standfirst" },
              { type: "string", name: "buttonLabel", label: "\"Read full biography\" button label" },
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
          seoField(),
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
              ...imageFields(),
            ],
          },
          { type: "string", name: "quote", label: "Pull quote", ui: { component: "textarea" } },
          {
            type: "object",
            name: "capabilities",
            label: "\"How we help\" section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "standfirst", label: "Standfirst" },
              {
                type: "object",
                name: "items",
                label: "Capability areas",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  paragraphList("Bullets", "bullets"),
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
          seoField(),
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
              ...imageFields(),
            ],
          },
          {
            type: "object",
            name: "trackRecord",
            label: "Current and previous work",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Title (shown in bold)" },
                  {
                    type: "rich-text",
                    name: "description",
                    label: "Description",
                    description: "Use bold to highlight programme and organisation names.",
                    overrides: { toolbar: ["bold", "italic", "link"] },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "advisory",
            label: "Advisory group memberships",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "currentLabel", label: "\"Current\" subheading" },
              { type: "string", name: "previousLabel", label: "\"Previous\" subheading" },
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
              { type: "string", name: "linkLabel", label: "\"View source\" link label" },
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
                  {
                    type: "object",
                    name: "links",
                    label: "Named links (optional)",
                    description:
                      "For a publication with more than one document. Each link shows its own label, e.g. the leaflet title.",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.label }) },
                    fields: [
                      { type: "string", name: "label", label: "Label" },
                      { type: "string", name: "url", label: "Link" },
                    ],
                  },
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
          seoField(),
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
              { type: "string", name: "firstNameLabel", label: "First name label" },
              { type: "string", name: "lastNameLabel", label: "Last name label" },
              { type: "string", name: "emailLabel", label: "Email label" },
              { type: "string", name: "phoneLabel", label: "Phone label" },
              { type: "string", name: "optionalLabel", label: "\"(optional)\" hint" },
              { type: "string", name: "messageLabel", label: "Message label" },
              { type: "string", name: "mailingListLabel", label: "Mailing list checkbox text", ui: { component: "textarea" } },
              { type: "string", name: "submitLabel", label: "Submit button label" },
              { type: "string", name: "successHeading", label: "Thank-you heading" },
              { type: "string", name: "successMessage", label: "Thank-you message" },
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
              "Shown just above the page footer and followed by the privacy notice link below, so end it where the link text should follow.",
            ui: { component: "textarea" },
          },
          { type: "string", name: "legalNoteLinkLabel", label: "Legal note link text" },
          seoField(),
        ],
      },
      {
        name: "newsPage",
        label: "News Page",
        path: "content/pages",
        format: "json",
        match: { include: "news" },
        ...singleton("news", "/news"),
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
            type: "string",
            name: "cardLinkLabel",
            label: "\"Read article\" link on news cards",
          },
          {
            type: "object",
            name: "more",
            label: "\"More from us\" (below each article)",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "linkLabel", label: "\"All news\" link label" },
            ],
          },
          seoField(),
        ],
      },
      {
        name: "privacyPage",
        label: "Privacy Page",
        path: "content/pages",
        format: "json",
        match: { include: "privacy" },
        ...singleton("privacy", "/privacy"),
        fields: legalPageFields(),
      },
      {
        name: "termsPage",
        label: "Terms of Use Page",
        path: "content/pages",
        format: "json",
        match: { include: "terms" },
        ...singleton("terms", "/terms"),
        fields: legalPageFields(),
      },
      {
        name: "siteSettings",
        label: "Site-wide Text",
        path: "content/pages",
        format: "json",
        match: { include: "site-settings" },
        ...singleton("site-settings", "/"),
        fields: [
          {
            type: "object",
            name: "navigation",
            label: "Menu labels",
            description: "The page names in the header menu and footer.",
            fields: [
              { type: "string", name: "whoWeAre", label: "Who we are" },
              { type: "string", name: "whatWeDo", label: "What we do" },
              { type: "string", name: "ourWork", label: "Our work" },
              { type: "string", name: "news", label: "News" },
              { type: "string", name: "getInTouch", label: "Get in touch (button)" },
            ],
          },
          { type: "string", name: "footerBlurb", label: "Footer blurb", ui: { component: "textarea" } },
          { type: "string", name: "footerExploreHeading", label: "Footer \"Explore\" heading" },
          { type: "string", name: "footerContactHeading", label: "Footer \"Get in touch\" heading" },
          { type: "string", name: "footerUncrcNote", label: "Footer UNCRC note", ui: { component: "textarea" } },
          { type: "string", name: "footerThanksNote", label: "Footer thank-you note", ui: { component: "textarea" } },
          { type: "string", name: "contactEmail", label: "Main contact email" },
          { type: "string", name: "companyLine", label: "Company/copyright line" },
          { type: "string", name: "privacyLinkLabel", label: "Footer privacy link label" },
          { type: "string", name: "termsLinkLabel", label: "Footer terms link label" },
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
        // A new post starts dated today and published, so writing one is:
        // title, cover photo, article, save.
        defaultItem: () => ({
          publishedAt: new Date().toISOString(),
          comingSoon: false,
        }),
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Date",
            description: "Shown on the article and used to order the news page. New posts start on today's date.",
            required: true,
          },
          { type: "image", name: "coverImage", label: "Cover photo", description: "Landscape photos work best." },
          {
            type: "string",
            name: "coverAlt",
            label: "Cover photo description (alt text)",
            description: "Describe what's in the photo for people using screen readers.",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Summary",
            description:
              "One or two sentences for the news card and Google. Leave blank to use the start of the article.",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Article",
            description: "Use the toolbar for subheadings, bold, links, lists, quotes and photos.",
            overrides: {
              toolbar: ["heading", "bold", "italic", "link", "ul", "ol", "quote", "image", "hr"],
              headingLevels: ["h2", "h3"],
            },
          },
          {
            type: "boolean",
            name: "comingSoon",
            label: "Coming soon placeholder",
            description:
              "Tick to show just a dated card with no link, for an article that isn't written yet. Leave unticked to publish.",
          },
        ],
        ui: {
          // The page address comes from the title, so there's no filename to
          // fill in. It's fixed once created so links to the post never break.
          allowedActions: { createFolder: false, createNestedFolder: false },
          filename: {
            readonly: true,
            description:
              "Filled in automatically from the title. It becomes the article's web address, so there's no need to change it.",
            slugify: (values) =>
              `${values?.title ?? ""}`
                .toLowerCase()
                .normalize("NFKD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80) || "untitled-post",
          },
          router: ({ document }) => `/news/${document._sys.filename}`,
        },
      },
    ],
  },
});
