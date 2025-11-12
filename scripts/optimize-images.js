#!/usr/bin/env node
/**
 * Script to convert images to WebP format
 * Requires: npm install --save-dev sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesToConvert = [
    { input: './img/avatar.jpeg', output: './img/avatar.webp', quality: 85 },
    { input: './img/companies/paydock_logo.jpeg', output: './img/companies/paydock_logo.webp', quality: 90 },
    { input: './img/companies/softserve_logo.png', output: './img/companies/softserve_logo.webp', quality: 90 },
    { input: './img/companies/mrc_develop_logo.jpeg', output: './img/companies/mrc_develop_logo.webp', quality: 90 },
    { input: './img/companies/codetiburon_logo.jpeg', output: './img/companies/codetiburon_logo.webp', quality: 90 },
    { input: './img/companies/polar_b_logo.jpeg', output: './img/companies/polar_b_logo.webp', quality: 90 },
    { input: './img/cubes.png', output: './img/cubes.webp', quality: 80 },
];

async function convertToWebP(inputPath, outputPath, quality) {
    try {
        if (!fs.existsSync(inputPath)) {
            console.warn(`⚠️  File not found: ${inputPath}`);
            return false;
        }

        const inputStats = fs.statSync(inputPath);
        await sharp(inputPath)
            .webp({ quality })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
        
        console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% smaller)`);
        return true;
    } catch (error) {
        console.error(`❌ Error converting ${inputPath}:`, error.message);
        return false;
    }
}

async function optimizeImages() {
    console.log('🖼️  Starting image optimization...\n');
    
    let successCount = 0;
    for (const image of imagesToConvert) {
        const success = await convertToWebP(image.input, image.output, image.quality);
        if (success) successCount++;
    }
    
    console.log(`\n✨ Converted ${successCount}/${imagesToConvert.length} images to WebP`);
}

optimizeImages().catch(console.error);

