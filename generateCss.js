const fs = require('fs');
const path = require('path');

// Read input JSON file
const inputFilePath = process.argv[2];
const outputFilePath = 'globals.css';

const data = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

function generateColorUtilities(colors) {
    let css = "";

    for (const [name, shades] of Object.entries(colors)) {
        for (const [key, value] of Object.entries(shades)) {
            const suffix = key === "DEFAULT" ? "" : `-${key}`;
            css += `
  .bg-${name}${suffix} { background-color: ${value}; }
  .text-${name}${suffix} { color: ${value}; }
  .border-${name}${suffix} { border-color: ${value}; }
        `;
        }
    }

    return css;
}

// Function to handle colors and generate CSS classes for each shade
function handleColors(colors, namePrefix = '') {
    let cssOutput = '';

    for (const colorName in colors) {
        const colorObj = colors[colorName];

        if (typeof colorObj === 'string') {
            // If it's just a single color value (not an object), handle it directly
            cssOutput += generateColorClasses(colorObj, namePrefix, colorName);
        } else {
            // If it's an object with shades, loop through each shade
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

// Function to generate color utility classes
function generateColorClasses(colorValue, prefix, suffix) {
    return `
    .bg-${prefix}${suffix} { background-color: ${colorValue}; }
    .text-${prefix}${suffix} { color: ${colorValue}; }
    .border-${prefix}${suffix} { border-color: ${colorValue}; }
    .ring-${prefix}${suffix} { box-shadow: 0 0 0 3px ${colorValue}; }
  `;
}

// Function to handle images (backgroundImage and gradient)
function handleImages(imageConfig) {
    let cssOutput = '';

    if (imageConfig.backgroundImage) {
        cssOutput += `
      .bg-image { background-image: ${imageConfig.backgroundImage}; }
    `;
    }

    if (imageConfig.gradient) {
        cssOutput += `
      .bg-gradient { background-image: ${imageConfig.gradient}; }
    `;
    }

    return cssOutput;
}

// Function to handle opacity
function handleOpacity(opacityConfig) {
    let cssOutput = '';

    for (const key in opacityConfig) {
        cssOutput += `
      .opacity-${key} { opacity: ${opacityConfig[key]}; }
    `;
    }

    return cssOutput;
}

// Function to handle boxShadow
function handleBoxShadow(boxShadowConfig) {
    let cssOutput = '';

    for (const key in boxShadowConfig) {
        cssOutput += `
      .shadow-${key} { box-shadow: ${boxShadowConfig[key]}; }
    `;
    }

    return cssOutput;
}

// Function to handle borderRadius
function handleBorderRadius(borderRadiusConfig) {
    let cssOutput = '';

    for (const key in borderRadiusConfig) {
        cssOutput += `
      .rounded-${key} { border-radius: ${borderRadiusConfig[key]}; }
    `;
    }

    return cssOutput;
}

// Function to handle fontSize
function handleFontSize(fontSizeConfig) {
    let cssOutput = '';

    for (const key in fontSizeConfig) {
        cssOutput += `
      .text-${key} { font-size: ${fontSizeConfig[key]}; }
    `;
    }

    return cssOutput;
}

// Function to handle height and width
function handleDimensions(dimConfig, type) {
    let cssOutput = '';

    for (const key in dimConfig) {
        cssOutput += `
      .${type}-${key} { ${type}: ${dimConfig[key]}; }
    `;
    }

    return cssOutput;
}

// Function to handle zIndex
function handleZIndex(zIndexConfig) {
    let cssOutput = '';

    for (const key in zIndexConfig) {
        cssOutput += `
      .z-${key} { z-index: ${zIndexConfig[key]}; }
    `;
    }

    return cssOutput;
}

// Function to handle screens
function handleScreens(screensConfig) {
    let cssOutput = '';

    for (const key in screensConfig) {
        cssOutput += `
      @media (min-width: ${screensConfig[key]}) {
        .screen-${key} { display: block; }
      }
    `;
    }

    return cssOutput;
}

// Function to handle transitions and animations
function handleTransitionsAndAnimations(config, type) {
    let cssOutput = '';

    for (const key in config) {
        cssOutput += `
      .${type}-${key} { transition: ${config[key]}; }
    `;
    }

    return cssOutput;
}

function handleRing(ringConfig) {

    let cssOutput = '';

    for (const key in ringConfig) {
        const colorValue = ringConfig[key];
        // Generate a ring class as a box-shadow (outline)
        cssOutput += `
        .ring-${key} { outline: ${colorValue}; } 
      `;
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
// Create the CSS file
let cssContent = '/* Generated CSS from JSON configuration */\n';

// Handle colors
cssContent += handleColors(data.colors);

// Handle images (backgroundImage, gradient)
cssContent += handleImages(data.image);

// Handle opacity values
cssContent += handleOpacity(data.opacity);

// Handle boxShadow values
cssContent += handleBoxShadow(data.boxShadow);

// Handle borderRadius values
cssContent += handleBorderRadius(data.borderRadius);

// Handle fontSize values
cssContent += handleFontSize(data.fontSize);

// Handle height and width
cssContent += handleDimensions(data.height, 'height');
cssContent += handleDimensions(data.width, 'width');

// Handle zIndex values
cssContent += handleZIndex(data.zIndex);

// Handle screens (media queries)
cssContent += handleScreens(data.screens);

cssContent += handleRing(data.ring);

// Handle transition and animation
cssContent += handleTransitionsAndAnimations(data.transition, 'transition');
cssContent += handleTransitionsAndAnimations(data.animation, 'animation');
cssContent += '\n' + handleSpacing(data.margin, 'margin');
cssContent += '\n' + handleSpacing(data.padding, 'padding');

// Write the generated CSS to the output file
fs.appendFileSync(path.resolve(outputFilePath), cssContent, 'utf8');

console.log(`CSS file generated successfully at ${outputFilePath}`);
