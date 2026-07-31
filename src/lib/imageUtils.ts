/**
 * Utility function to map product names to their corresponding image URLs
 * Maps to product images in the public/product folder
 */
export function getProductImageUrl(productName: string): string {
  const name = productName.toLowerCase();
  
  // Map product names to product folder images
  if (name.includes('t-5 adventa') || name.includes('t5 adventa')) {
    return '/product/4.T-5 Adventa.png';
  } else if (name.includes('zd adventa') || name.includes('elenta')) {
    return '/product/5ZD aventa- elanta.png';
  } else if (name.includes('rainbow') && name.includes('plus')) {
    return '/product/7Rainbow plus.png';
  } else if (name.includes('rainbow')) {
    return '/product/6Rainbow.png';
  } else if (name.includes('irish') && name.includes('flower')) {
    return '/product/10 Irish & Irish flower.png';
  } else if (name.includes('irish')) {
    return '/product/10 Irish & Irish flower.png';
  } else if (name.includes('orion') && (name.includes('backlit') || name.includes('add-on'))) {
    return '/product/13 Orion Add-on.png';
  } else if (name.includes('orion')) {
    return '/product/14 Orion & Orion backlit new .png';
  } else if (name.includes('sol series') || name.includes('sol cob')) {
    return '/product/25 SOL.png';
  } else if (name.includes('super nova')) {
    return '/product/34 Super Nova.png';
  } else if (name.includes('diamond')) {
    return '/product/40. DIAMOND png.png';
  } else if (name.includes('platinum') && name.includes('slimo')) {
    return '/product/41 PLATINUM & PLATIMUN Slimo Ultra.png';
  } else if (name.includes('splendor plus')) {
    return '/product/49 Splendor Plus.png';
  } else if (name.includes('emergency') || name.includes('tornedo')) {
    return '/product/57 Emergency Night Tornedo.png';
  } else if (name.includes('lexa') || name.includes('ufo')) {
    return '/product/53.LEXA png.png';
  } else if (name.includes('linear')) {
    return '/product/58 Linear .png';
  } else if (name.includes('glitter rope')) {
    return '/product/60. Glitter png.png';
  } else if (name.includes('sparkle') && name.includes('smps')) {
    return '/product/62. Sparkle SMPS png.png';
  } else if (name.includes('sparkle')) {
    return '/product/63.Sparkle png.png';
  } else if (name.includes('bollard') || name.includes('post top') || name.includes('beacon')) {
    return '/product/52.Beacon png.png';
  } else if (name.includes('insulation tape')) {
    return '/product/79. Insulation Tape PVC (6mX1.5mX0.125m)png.png';
  } else if (name.includes('well glass light') || name.includes('well glass')) {
    return '/WELL glass light.webp';
  } else if (name.includes('orion dawn')) {
    return '/orion dawn light.webp';
  } else if (name.includes('sparkle strip')) {
    return '/sparkle strip.webp';
  } else if (name.includes('track light')) {
    return '/track light.webp';
  } else if (name.includes('highbay dome') || name.includes('highbay')) {
    return '/Highbay dome.webp';
  } else if (name.includes('bulb')) {
    return '/bulb.webp';
  }
  
  // Fallback: try to match product name to product folder images
  // This will need to be expanded as more products are added
  return '/product/4.T-5 Adventa.png'; // Default fallback
}

/** Prefer Sanity CDN URLs; otherwise use local name-based mapping. */
export function resolveProductDisplayImage(product: { name: string; image_url: string }): string {
  if (product.image_url.startsWith('https://')) {
    return product.image_url;
  }
  return getProductImageUrl(product.name);
}

export function resolveProductsDisplayImages<T extends { name: string; image_url: string }>(
  products: T[],
): T[] {
  return products.map((product) => ({
    ...product,
    image_url: resolveProductDisplayImage(product),
  }));
}

