import fs from 'fs';
import path from 'path';

const sitemapPath = path.resolve('public/sitemap.xml');

try {
  let content = fs.readFileSync(sitemapPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  
  content = content.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  
  fs.writeFileSync(sitemapPath, content, 'utf8');
  console.log(`✅ Successfully updated all <lastmod> dates in sitemap.xml to ${today}`);
} catch (error) {
  console.error('Error updating sitemap date:', error);
}
