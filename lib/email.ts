import { Order } from "@/types/appwrite.types";

export const generateOrderEmail = (order: Order) => {
    const orderItems = JSON.parse(order.order_items);
    const subtotal = orderItems.reduce((sum: number, item: { totalPrice: string }) => sum + Number(item.totalPrice), 0);
    const discount = Number(order.price) - order.discountedPrice;
    const total = order.discountedPrice;

    const orderDate = new Date(order.$createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const itemRows = orderItems.map((item: { name: string, quantity: number, price: string }) => `
      <tr>
        <td style="border: 1px solid #e0e0e0;">${item.name}</td>
        <td align="center" style="border: 1px solid #e0e0e0;">${item.quantity}</td>
        <td align="right" style="border: 1px solid #e0e0e0;">₨${Number(item.price).toFixed(2)}</td>
      </tr>
    `).join('');

    const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 20px;">
          <tr>
              <td align="center">
                  <img src="https://your-logo-url.com/logo.png" alt="Your Logo" style="max-width: 150px; margin-bottom: 20px;">
                  <h1 style="color: #4a4a4a; margin-bottom: 20px;">Order Confirmation</h1>
                  <p style="font-size: 16px; margin-bottom: 30px;">Thank you for your purchase, ${order.customer_name}!</p>
              </td>
          </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
          <tr>
              <td>
                  <h2 style="color: #4a4a4a; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Order Details</h2>
                  <p><strong>Order Number:</strong> #${order.$id}</p>
                  <p><strong>Order Date:</strong> ${orderDate}</p>
                  <p><strong>Order Status:</strong> ${order.status}</p>
              </td>
          </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
          <tr>
              <td>
                  <h2 style="color: #4a4a4a; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Items Ordered</h2>
              </td>
          </tr>
          <tr>
              <td>
                  <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
                      <tr style="background-color: #f0f0f0;">
                          <th align="left" style="border: 1px solid #e0e0e0;">Product</th>
                          <th align="center" style="border: 1px solid #e0e0e0;">Quantity</th>
                          <th align="right" style="border: 1px solid #e0e0e0;">Price</th>
                      </tr>
                      ${itemRows}
                  </table>
              </td>
          </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
          <tr>
              <td>
                  <h2 style="color: #4a4a4a; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Order Summary</h2>
                  <table width="100%" cellpadding="5" cellspacing="0">
                      <tr>
                          <td>Subtotal:</td>
                          <td align="right">₨${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                          <td>Discount:</td>
                          <td align="right">₨${discount.toFixed(2)}</td>
                      </tr>
                      <tr>
                          <td><strong>Total:</strong></td>
                          <td align="right"><strong>₨${total.toFixed(2)}</strong></td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
          <tr>
              <td>
                  <h2 style="color: #4a4a4a; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Shipping Information</h2>
                  <p><strong>Name:</strong> ${order.customer_name}</p>
                  <p><strong>Address:</strong> ${order.delivery_address}</p>
                  <p><strong>City:</strong> ${order.delivery_city}</p>
                  <p><strong>State:</strong> ${order.delivery_state}</p>
                  <p><strong>Phone:</strong> ${order.customer_phone}</p>
                  <p><strong>Email:</strong> ${order.customer_email}</p>
              </td>
          </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; background-color: #f8f8f8; padding: 20px;">
          <tr>
              <td align="center">
                  <p style="margin-bottom: 10px;">If you have any questions, please contact our customer support.</p>
                  <p style="margin-bottom: 10px;">Thank you for shopping with us!</p>
                  <a href="https://your-website.com" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Visit Our Store</a>
              </td>
          </tr>
      </table>
  </body>
  </html>
    `;

    return emailTemplate;
};
