// @ts-check

const { themes } = require("prism-react-renderer");

const config = {
  title: "Symphony API Docs",
  tagline: "Documentation for Symphony API Demo",
  url: "https://alse-sym.github.io",
  baseUrl: "/symphony-api-demo-docs/",
  organizationName: "alse-sym",
  projectName: "symphony-api-demo-docs",
  onBrokenLinks: "throw",
  favicon: "img/favicon.svg",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          editUrl:
            "https://github.com/alse-sym/symphony-api-demo-docs/tree/main/",
        },
        blog: false,
        pages: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Symphony API Docs",
      logo: {
        alt: "Symphony",
        src: "img/logo.svg",
        width: 28,
        height: 28,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              to: "/release-notes",
              label: "Release Notes",
            },
          ],
        },
        {
          href: "https://github.com/alse-sym/symphony-api-demo-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      copyright: `Copyright &copy; ${new Date().getFullYear()} Symphony API Demo &mdash; Automated docs pipeline with gh-aw.`,
    },
    prism: {
      theme: themes.vsLight,
      darkTheme: themes.dracula,
      additionalLanguages: ["bash", "json", "yaml", "typescript"],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  },
  future: {
    v4: true,
  },
};

module.exports = config;
