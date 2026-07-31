// src/utils/email.js

// Put your gallery's order-receiving email address here
export const ORDER_EMAIL = "www.eche2020@gmail.com";

/**
 * Builds a mailto: link for ordering a SINGLE artwork
 */
export function getSingleOrderEmailLink(art) {
  const subject = `Order Inquiry: ${art.title}`;
  const body = `Hi!\n\nI'd like to order:\n\n${art.title} — ₦${art.price.toLocaleString()}\n\nIs it still available?`;
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Builds a mailto: link for a FULL CART checkout
 */
export function getCartOrderEmailLink(cart, total) {
  const lines = cart.map((item) => {
    const qty = item.quantity || 1;
    const options = [
      item.selectedSize && `Size: ${item.selectedSize}`,
      item.selectedFrame && `Frame: ${item.selectedFrame}`,
      item.selectedMedium && `Medium: ${item.selectedMedium}`,
    ]
      .filter(Boolean)
      .join(", ");

    return `- ${item.title} x${qty} — ₦${(item.price * qty).toLocaleString()}${
      options ? ` (${options})` : ""
    }`;
  });

  const subject = "New Art Order";
  const body =
    `Hi!\n\nI'd like to place an order:\n\n` +
    lines.join("\n") +
    `\n\nTotal: ₦${total.toLocaleString()}`;

  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
