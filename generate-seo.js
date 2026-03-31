const fs = require('fs');
const path = require('path');
const routes = require('../ssg-routes');

const baseUrl = 'https://example.com'; // ganti dengan domainmu
const distDir = path.resolve(__dirname, '../dist/ssg');

// ===== robots.txt =====
const robotsContent = `
User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`.trim();

fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
console.log('robots.txt generated');

// ===== sitemap.xml =====
const sitemapContent = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>
`.trim();

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
console.log('sitemap.xml generated');
