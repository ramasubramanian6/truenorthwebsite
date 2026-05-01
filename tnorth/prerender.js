import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  '/',
  '/services',
  '/services/development',
  '/services/qa-testing',
  '/services/support',
  '/services/implementation',
  '/about',
  '/contact',
  '/careers',
  '/blog',
  '/blog/future-of-qa-testing',
  '/blog/scaling-react-applications',
  '/blog/saas-product-development-guide',
  '/case-studies',
  '/case-studies/fintech-cloud-migration',
  '/case-studies/ecommerce-scale',
  '/case-studies/healthcare-analytics',
  '/testimonials',
  '/privacy',
  '/terms'
];

async function prerender() {
  const app = express();
  const distPath = path.join(__dirname, 'dist');
  
  // Read original index.html to use as a reliable fallback
  const originalIndexHtml = await fs.readFile(path.join(distPath, 'index.html'), 'utf-8');
  
  // Serve static files from dist
  app.use(express.static(distPath));
  
  // Fallback for SPA
  app.get('*', (req, res) => {
    res.send(originalIndexHtml);
  });

  const server = app.listen(3000, () => {
    console.log('Prerender server running on port 3000');
  });

  const browser = await puppeteer.launch({ headless: 'new' });
  
  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    const page = await browser.newPage();
    
    try {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      const html = await page.content();
      
      const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
      const outputPath = path.join(distPath, routePath);
      
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, html);
    } catch (err) {
      console.error(`Failed to prerender ${route}:`, err);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(console.error);
