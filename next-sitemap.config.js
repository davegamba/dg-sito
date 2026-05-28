/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://davegamba.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/studio/*", "/studio"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/hub", "/api"],
      },
    ],
    additionalSitemaps: [
      "https://davegamba.com/sitemap.xml",
    ],
  },
  transform: async (config, path) => {
    // Priorità alte per pagine chiave
    const highPriority = ["/", "/blog", "/metodo"];
    const medPriority = ["/prodotti"];

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: highPriority.includes(path)
        ? 1.0
        : medPriority.some((p) => path.startsWith(p))
        ? 0.8
        : config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
