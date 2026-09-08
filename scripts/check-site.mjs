import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
await fs.mkdir('test-results', {recursive:true});
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({viewport:{width,height:960},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror', e=>errors.push(e.message));
    await page.goto(base, {waitUntil:'networkidle'});
    await page.locator('img').evaluateAll(async imgs=>{
      for(const img of imgs) {img.loading='eager';}
      await Promise.all(imgs.map(img=>img.decode()));
    });
    await page.locator('[data-mac=macbook]').click();
    if(await page.locator('#demo-status').textContent() !== 'Input is on MacBook') throw Error('Demo did not switch');
    await page.locator('[data-mac=studio]').click();
    if(await page.locator('[data-mac=studio]').getAttribute('aria-pressed') !== 'true') throw Error('Demo did not return');
    const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    if(overflow) throw Error(`Horizontal overflow at ${width}`);
    const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
    if(errors.length||broken.length) throw Error(JSON.stringify({errors,broken}));
    await page.screenshot({path:`test-results/desk-${width}.png`,fullPage:true});
    console.log(`PASS ${width}px: demo, images, overflow, console`);
    await page.close();
  }
} finally {await browser.close();}
