/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Start Here",
      collapsed: false,
      items: ["index", "getting-started", "installation", "quickstart"],
    },
    {
      type: "category",
      label: "Core Concepts",
      collapsed: false,
      items: ["architecture", "modules-overview"],
    },
    {
      type: "category",
      label: "API Fundamentals",
      collapsed: false,
      items: [
        "api-overview",
        "authentication",
        "errors",
        "pagination-filtering",
      ],
    },
    {
      type: "category",
      label: "API Reference",
      collapsed: false,
      items: [
        "projects-api",
        "tasks-api",
        "teams-api",
        "comments-api",
        "notifications-api",
      ],
    },
    {
      type: "category",
      label: "Operations",
      collapsed: false,
      items: ["deployment", "troubleshooting"],
    },
    {
      type: "category",
      label: "Release Notes",
      collapsed: false,
      items: ["release-notes"],
    },
  ],
};

module.exports = sidebars;
