// src/utils/whatsapp.js

// Put your gallery's WhatsApp number here: country code + number, no "+" or leading 0
export const WHATSAPP_NUMBER = "2349079794368";

/**
 * Builds a wa.me link for ordering a SINGLE artwork
 * (used on the artwork card / details page for quick orders)
 */
export function getSingleOrderLink(art) {
  const message = `Hi! I'd like to order:\n\n• ${art.title} — ₦${art.price.toLocaleString()}\n\nIs it still available?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a wa.me link for a FULL CART checkout
 * (used on the Cart page "Proceed to Order" button)
 */
export function getCartOrderLink(cart, total) {
  const lines = cart.map((item) => {
    const qty = item.quantity || 1;
    const options = [
      item.selectedSize && `Size: ${item.selectedSize}`,
      item.selectedFrame && `Frame: ${item.selectedFrame}`,
      item.selectedMedium && `Medium: ${item.selectedMedium}`,
    ]
      .filter(Boolean)
      .join(", ");

    return `• ${item.title} x${qty} — ₦${(item.price * qty).toLocaleString()}${
      options ? ` (${options})` : ""
    }`;
  });

  const message =
    `Hi! I'd like to place an order:\n\n` +
    lines.join("\n") +
    `\n\nTotal: ₦${total.toLocaleString()}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
