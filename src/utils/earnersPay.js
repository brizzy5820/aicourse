/**
 * EarnersPay Checkout Utilities
 * Handles building checkout URLs with product and affiliate tracking
 */

const EARNERSPAY_BASE_URL = 'https://app.earnerspay.com/checkout';
// Default product ID - matches config in src/config/productConfig.js
const DEFAULT_PRODUCT_ID = 'epr-689129';

/**
 * Builds the EarnersPay checkout URL with product and affiliate parameters
 * @param {Object} config - Product configuration containing earnersPayProductId and earnersPayAffiliateId
 * @param {Object} urlParams - Optional URLSearchParams to extract p (product) and a (affiliate) from current URL
 * @returns {string} Complete checkout URL
 */
export function buildEarnersPayCheckoutUrl(config, urlParams = new URLSearchParams(window.location.search)) {
  const meta = config?.meta || {};
  
  // Priority: URL params > Config defaults > Hardcoded default
  const productId = urlParams.get('p') || meta.earnersPayProductId || DEFAULT_PRODUCT_ID || '';
  const affiliateId = urlParams.get('a') || meta.earnersPayAffiliateId || '';
  
  if (!productId) {
    console.warn('EarnersPay: No product ID configured. Set earnersPayProductId in product config.');
    return EARNERSPAY_BASE_URL;
  }
  
  const params = new URLSearchParams();
  params.set('p', productId);
  
  if (affiliateId) {
    params.set('a', affiliateId);
  }
  
  return `${EARNERSPAY_BASE_URL}?${params.toString()}`;
}

/**
 * Opens EarnersPay checkout in a new tab
 * @param {Object} config - Product configuration
 * @param {Object} urlParams - Optional URLSearchParams
 */
export function openEarnersPayCheckout(config, urlParams) {
  const checkoutUrl = buildEarnersPayCheckoutUrl(config, urlParams);
  window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Gets the checkout URL for anchor href attributes
 * @param {Object} config - Product configuration
 * @param {Object} urlParams - Optional URLSearchParams
 * @returns {string} Checkout URL for use in <a href="">
 */
export function getEarnersPayCheckoutHref(config, urlParams) {
  return buildEarnersPayCheckoutUrl(config, urlParams);
}

/**
 * CSS class for EarnersPay checkout buttons/links
 * Used by the external script to auto-attach URLs
 */
export const EARNERSPAY_CHECKOUT_CLASS = 'ep-checkout-btn';