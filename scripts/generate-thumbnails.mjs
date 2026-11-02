#!/usr/bin/env node
/* Generates lightweight thumbnail and optimized preview versions for portfolio items, logos, and portraits */
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import sharp from "sharp";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SCRIPT_DIR, "..");
const PORTFOLIO_DIR = join(ROOT, "assets", "portfolio");
const IMAGES_DIR = join(ROOT, "assets", "images");

const PORTFOLIO_ITEMS = [
  {
    id: "harrogate-jagwar",
    base: "harrogatejagwar.co.uk",
    heroSrc: "harrogatejagwar.co.uk-hero.png",
    fullSrc: "harrogatejagwar.co.uk-full.png",
    mobileSrc: "harrogatejagwar.co.uk-mobile.png"
  },
  {
    id: "ellavate-dogs",
    base: "ellavatedogs.com",
    heroSrc: "ellavatedogs.com-hero.png",
    fullSrc: "ellavatedogs.com-full.png",
    mobileSrc: "ellavatedogs.com-mobile.png"
  },
  {
    id: "established-home-improvements",
    base: "established-home-improvements",
    heroSrc: "established-home-improvements-hero.png",
    fullSrc: "established-home-improvements-full.png",
    mobileSrc: "established-home-improvements-mobile.png"
  },
  {
    id: "fliss-and-ivy",
    base: "fliss-&-ivy",
    heroSrc: "fliss-&-ivy-hero.png",
    fullSrc: "fliss-&-ivy-full.png",
    mobileSrc: "fliss-&-Ivy-mobile.png"
  },
  {
    id: "halo-hair-design",
    base: "halo-hair-design",
    heroSrc: "halo-hair-design-hero.png",
    fullSrc: "halo-hair-design-full.png",
    mobileSrc: "halo-hair-design-mobile.png"
  },
  {
    id: "skyrise-contractors",
    base: "skyrise-contractors",
    heroSrc: "skyrise-contractors-hero.png",
    fullSrc: "skyrise-contractors-full.png",
    mobileSrc: "skyrise-contractors-mobile.png"
  },
  {
    id: "the-eden-pack",
    base: "the-eden-pack",
    heroSrc: "the-eden-pack-hero.png",
    fullSrc: "the-eden-pack-full.png",
    mobileSrc: "the-eden-pack-mobile.png"
  },
  {
    id: "the-hive-property-group",
    base: "the-hive-property-group",
    heroSrc: "the-hive-property-group-hero.png",
    fullSrc: "the-hive-property-group-full.png",
    mobileSrc: "the-hive-property-group-mobile.png"
  }
];

async function main() {
  console.log("=== Generating Optimized Portfolio & Website Images ===");
  let totalOrigHero = 0;
  let totalOrigFull = 0;
  let totalOrigMobile = 0;
  let totalGlobeWebp = 0;
  let totalThumbWebp = 0;
  let totalFullWebp = 0;
  let totalMobileWebp = 0;

  for (const item of PORTFOLIO_ITEMS) {
    const heroPath = join(PORTFOLIO_DIR, item.heroSrc);
    const fullPath = join(PORTFOLIO_DIR, item.fullSrc);
    const mobilePath = join(PORTFOLIO_DIR, item.mobileSrc);

    console.log(`\nProcessing ${item.id}...`);

    // 1. Spinning Banner Globe Thumbnail (400x300, 4:3) & Standard Thumbnail (800x600, 4:3)
    if (existsSync(heroPath)) {
      const heroSize = statSync(heroPath).size;
      totalOrigHero += heroSize;

      const globeWebp = join(PORTFOLIO_DIR, `${item.base}-globe.webp`);
      const globePng = join(PORTFOLIO_DIR, `${item.base}-globe.png`);
      const thumbWebp = join(PORTFOLIO_DIR, `${item.base}-thumb.webp`);
      const thumbPng = join(PORTFOLIO_DIR, `${item.base}-thumb.png`);

      // 400x300 for 3D spinning globe tiles (200x150 on screen @ 2x)
      await sharp(heroPath)
        .resize(400, 300, { fit: "cover", position: "top" })
        .webp({ quality: 80, effort: 6 })
        .toFile(globeWebp);

      await sharp(heroPath)
        .resize(400, 300, { fit: "cover", position: "top" })
        .png({ compressionLevel: 9, quality: 80 })
        .toFile(globePng);

      // 800x600 for portfolio marquee cards & grid cards
      await sharp(heroPath)
        .resize(800, 600, { fit: "cover", position: "top" })
        .webp({ quality: 80, effort: 6 })
        .toFile(thumbWebp);

      await sharp(heroPath)
        .resize(800, 600, { fit: "cover", position: "top" })
        .png({ compressionLevel: 9, quality: 80 })
        .toFile(thumbPng);

      const gSize = statSync(globeWebp).size;
      const tSize = statSync(thumbWebp).size;
      totalGlobeWebp += gSize;
      totalThumbWebp += tSize;

      console.log(`  ✓ Globe (400x300): ${(gSize / 1024).toFixed(1)} KB`);
      console.log(`  ✓ Card Thumb (800x600): ${(tSize / 1024).toFixed(1)} KB`);
    } else {
      console.warn(`  ! Hero source not found: ${heroPath}`);
    }

    // 2. Interactive Portfolio Desktop Showcase (1280px wide)
    if (existsSync(fullPath)) {
      const fullSize = statSync(fullPath).size;
      totalOrigFull += fullSize;

      const fullWebp = join(PORTFOLIO_DIR, `${item.base}-full.webp`);
      const fullJpg = join(PORTFOLIO_DIR, `${item.base}-full.jpg`);

      await sharp(fullPath)
        .resize(1280, null, { withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(fullWebp);

      await sharp(fullPath)
        .resize(1280, null, { withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(fullJpg);

      const fSize = statSync(fullWebp).size;
      totalFullWebp += fSize;
      console.log(`  ✓ Desktop Showcase (1280w): ${(fullSize / 1024 / 1024).toFixed(2)} MB -> ${(fSize / 1024).toFixed(1)} KB (-${((1 - fSize / fullSize) * 100).toFixed(1)}%)`);
    } else {
      console.warn(`  ! Full source not found: ${fullPath}`);
    }

    // 3. Interactive Portfolio Mobile Showcase (600px wide)
    if (existsSync(mobilePath)) {
      const mobileSize = statSync(mobilePath).size;
      totalOrigMobile += mobileSize;

      const mobileWebp = join(PORTFOLIO_DIR, `${item.base}-mobile.webp`);
      const mobileJpg = join(PORTFOLIO_DIR, `${item.base}-mobile.jpg`);

      await sharp(mobilePath)
        .resize(600, null, { withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(mobileWebp);

      await sharp(mobilePath)
        .resize(600, null, { withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(mobileJpg);

      const mSize = statSync(mobileWebp).size;
      totalMobileWebp += mSize;
      console.log(`  ✓ Mobile Showcase (600w): ${(mobileSize / 1024 / 1024).toFixed(2)} MB -> ${(mSize / 1024).toFixed(1)} KB (-${((1 - mSize / mobileSize) * 100).toFixed(1)}%)`);
    } else {
      console.warn(`  ! Mobile source not found: ${mobilePath}`);
    }
  }

  console.log("\n--- Portfolio Compression Summary ---");
  console.log(`Hero Images (Spinning Banner & Thumbs): ${(totalOrigHero / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  -> 400x300 Globe Tiles total:        ${(totalGlobeWebp / 1024).toFixed(1)} KB (-${((1 - totalGlobeWebp / totalOrigHero) * 100).toFixed(1)}%)`);
  console.log(`  -> 800x600 Card Thumbs total:        ${(totalThumbWebp / 1024).toFixed(1)} KB (-${((1 - totalThumbWebp / totalOrigHero) * 100).toFixed(1)}%)`);
  console.log(`Desktop Full Showcases:                ${(totalOrigFull / 1024 / 1024).toFixed(2)} MB -> ${(totalFullWebp / 1024 / 1024).toFixed(2)} MB (-${((1 - totalFullWebp / totalOrigFull) * 100).toFixed(1)}%)`);
  console.log(`Mobile Full Showcases:                 ${(totalOrigMobile / 1024 / 1024).toFixed(2)} MB -> ${(totalMobileWebp / 1024 / 1024).toFixed(2)} MB (-${((1 - totalMobileWebp / totalOrigMobile) * 100).toFixed(1)}%)`);
  const totalOrigAll = totalOrigHero + totalOrigFull + totalOrigMobile;
  const totalNewAll = totalGlobeWebp + totalThumbWebp + totalFullWebp + totalMobileWebp;
  console.log(`Total Portfolio Assets:                ${(totalOrigAll / 1024 / 1024).toFixed(2)} MB -> ${(totalNewAll / 1024 / 1024).toFixed(2)} MB (-${((1 - totalNewAll / totalOrigAll) * 100).toFixed(1)}%)`);

  // Generate logo thumbnails
  console.log("\nGenerating logo thumbnails...");
  const logoSrc = join(IMAGES_DIR, "logo-mark.png");
  if (existsSync(logoSrc)) {
    const logoWebp = join(IMAGES_DIR, "logo-mark-thumb.webp");
    const logoPng = join(IMAGES_DIR, "logo-mark-thumb.png");
    await sharp(logoSrc)
      .resize(460, null, { withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(logoWebp);
    await sharp(logoSrc)
      .resize(460, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(logoPng);
    console.log(`  ✓ logo-mark-thumb.webp: ${(statSync(logoWebp).size / 1024).toFixed(1)} KB`);
    console.log(`  ✓ logo-mark-thumb.png:  ${(statSync(logoPng).size / 1024).toFixed(1)} KB`);
  }

  // Generate founder avatar thumbnail
  console.log("\nGenerating founder avatar thumbnail...");
  const avatarSrc = join(IMAGES_DIR, "elliot-marsters.jpg");
  if (existsSync(avatarSrc)) {
    const avatarWebp = join(IMAGES_DIR, "elliot-marsters-thumb.webp");
    const avatarJpg = join(IMAGES_DIR, "elliot-marsters-thumb.jpg");
    await sharp(avatarSrc)
      .resize(176, 176, { fit: "cover" })
      .webp({ quality: 85 })
      .toFile(avatarWebp);
    await sharp(avatarSrc)
      .resize(176, 176, { fit: "cover" })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(avatarJpg);
    console.log(`  ✓ elliot-marsters-thumb.webp: ${(statSync(avatarWebp).size / 1024).toFixed(1)} KB`);
    console.log(`  ✓ elliot-marsters-thumb.jpg:  ${(statSync(avatarJpg).size / 1024).toFixed(1)} KB`);
  }

  // Generate about portrait thumbnail
  console.log("\nGenerating about portrait thumbnail...");
  const aboutSrc = join(IMAGES_DIR, "about-elliot.jpg");
  if (existsSync(aboutSrc)) {
    const aboutWebp = join(IMAGES_DIR, "about-elliot-thumb.webp");
    const aboutJpg = join(IMAGES_DIR, "about-elliot-thumb.jpg");
    await sharp(aboutSrc)
      .resize(800, null)
      .webp({ quality: 84 })
      .toFile(aboutWebp);
    await sharp(aboutSrc)
      .resize(800, null)
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(aboutJpg);
    console.log(`  ✓ about-elliot-thumb.webp: ${(statSync(aboutWebp).size / 1024).toFixed(1)} KB`);
    console.log(`  ✓ about-elliot-thumb.jpg:  ${(statSync(aboutJpg).size / 1024).toFixed(1)} KB`);
  }

  console.log("\nAll thumbnails and showcases generated successfully.");
}

main().catch(err => {
  console.error("Thumbnail generation failed:", err);
  process.exit(1);
});
