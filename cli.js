#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get input JSON file and output file name from command line arguments
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3] || 'globals.css';

if (!inputFilePath) {
    console.error('Please provide the path to the input JSON file.');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

function generateColorClasses(colorValue, prefix, suffix) {
    return `
    .bg-${prefix}${suffix} { background-color: ${colorValue}; }
    .text-${prefix}${suffix} { color: ${colorValue}; }
    .border-${prefix}${suffix} { border-color: ${colorValue}; }
    .ring-${prefix}${suffix} { box-shadow: 0 0 0 3px ${colorValue}; }
  `;
}

function handleColors(colors, namePrefix = '') {
    let cssOutput = '';

    for (const colorName in colors) {
        const colorObj = colors[colorName];

        if (typeof colorObj === 'string') {
            cssOutput += generateColorClasses(colorObj, namePrefix, colorName);
        } else {
            for (const shade in colorObj) {
                if (shade === 'DEFAULT') {
                    cssOutput += generateColorClasses(colorObj[shade], namePrefix, colorName);
                } else {
                    cssOutput += generateColorClasses(colorObj[shade], namePrefix, `${colorName}-${shade}`);
                }
            }
        }
    }

    return cssOutput;
}

function handleImages(imageConfig) {
    let cssOutput = '';

    if (imageConfig.backgroundImage) {
        cssOutput += `\n.bg-image { background-image: ${imageConfig.backgroundImage}; }\n`;
    }

    if (imageConfig.gradient) {
        cssOutput += `\n.bg-gradient { background-image: ${imageConfig.gradient}; }\n`;
    }

    return cssOutput;
}

function handleOpacity(opacityConfig) {
    let cssOutput = '';

    for (const key in opacityConfig) {
        cssOutput += `\n.opacity-${key} { opacity: ${opacityConfig[key]}; }\n`;
    }

    return cssOutput;
}

function handleBoxShadow(boxShadowConfig) {
    let cssOutput = '';

    for (const key in boxShadowConfig) {
        cssOutput += `\n.shadow-${key} { box-shadow: ${boxShadowConfig[key]}; }\n`;
    }

    return cssOutput;
}

function handleBorderRadius(borderRadiusConfig) {
    let cssOutput = '';

    for (const key in borderRadiusConfig) {
        cssOutput += `\n.rounded-${key} { border-radius: ${borderRadiusConfig[key]}; }\n`;
    }

    return cssOutput;
}

function handleFontSize(fontSizeConfig) {
    let cssOutput = '';

    for (const key in fontSizeConfig) {
        cssOutput += `\n.text-${key} { font-size: ${fontSizeConfig[key]}; }\n`;
    }

    return cssOutput;
}

function handleDimensions(dimConfig, type) {
    let cssOutput = '';

    for (const key in dimConfig) {
        cssOutput += `\n.${type}-${key} { ${type}: ${dimConfig[key]}; }\n`;
    }

    return cssOutput;
}

function handleZIndex(zIndexConfig) {
    let cssOutput = '';

    for (const key in zIndexConfig) {
        cssOutput += `\n.z-${key} { z-index: ${zIndexConfig[key]}; }\n`;
    }

    return cssOutput;
}

function handleScreens(screensConfig) {
    let cssOutput = '';

    for (const key in screensConfig) {
        cssOutput += `\n@media (min-width: ${screensConfig[key]}) {
  .screen-${key} { display: block; }
}\n`;
    }

    return cssOutput;
}

function handleTransitionsAndAnimations(config, type) {
    let cssOutput = '';

    for (const key in config) {
        cssOutput += `\n.${type}-${key} { transition: ${config[key]}; }\n`;
    }

    return cssOutput;
}

function handleRing(ringConfig) {
    let cssOutput = '';

    for (const key in ringConfig) {
        cssOutput += `\n.ring-${key} { outline: ${ringConfig[key]}; }\n`;
    }

    return cssOutput;
}

function handleSpacing(spacingConfig, type) {
    let css = '';
    const directions = ['', 'x', 'y', 't', 'r', 'b', 'l'];
    const propertyMap = {
        '': type,
        x: [`${type}-left`, `${type}-right`],
        y: [`${type}-top`, `${type}-bottom`],
        t: `${type}-top`,
        r: `${type}-right`,
        b: `${type}-bottom`,
        l: `${type}-left`,
    };

    for (const key in spacingConfig) {
        const value = spacingConfig[key];
        for (const dir of directions) {
            const className = `.${type[0]}${dir}-${key}`;
            const prop = propertyMap[dir];
            if (Array.isArray(prop)) {
                css += `${className} { ${prop[0]}: ${value}; ${prop[1]}: ${value}; }\n`;
            } else {
                css += `${className} { ${prop}: ${value}; }\n`;
            }
        }
    }
    return css;
}

// Create CSS content
let cssContent = '/* Generated CSS from JSON configuration */\n';

if (data.colors) cssContent += handleColors(data.colors);
if (data.image) cssContent += handleImages(data.image);
if (data.opacity) cssContent += handleOpacity(data.opacity);
if (data.boxShadow) cssContent += handleBoxShadow(data.boxShadow);
if (data.borderRadius) cssContent += handleBorderRadius(data.borderRadius);
if (data.fontSize) cssContent += handleFontSize(data.fontSize);
if (data.height) cssContent += handleDimensions(data.height, 'height');
if (data.width) cssContent += handleDimensions(data.width, 'width');
if (data.zIndex) cssContent += handleZIndex(data.zIndex);
if (data.screens) cssContent += handleScreens(data.screens);
if (data.ring) cssContent += handleRing(data.ring);
if (data.transition) cssContent += handleTransitionsAndAnimations(data.transition, 'transition');
if (data.animation) cssContent += handleTransitionsAndAnimations(data.animation, 'animation');
if (data.margin) cssContent += '\n' + handleSpacing(data.margin, 'margin');
if (data.padding) cssContent += '\n' + handleSpacing(data.padding, 'padding');

fs.appendFileSync(path.resolve(outputFilePath), cssContent, 'utf8');

console.log(`CSS file generated successfully at ${outputFilePath}`);
