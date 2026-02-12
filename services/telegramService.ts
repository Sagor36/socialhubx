
/**
 * Telegram Notification Service for Social Hub X BD
 * Handles formatted alerts for system events.
 */

const BOT_TOKEN = '8426020467:AAH-hVYfS7ryK13vxEKUzUQHJy0QvQnVpjU';
const CHAT_ID = '7236181886';

const sendMessage = async (text: string) => {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });
    const result = await response.json();
    if (!result.ok) {
      console.warn('Telegram API Response Error:', result);
    }
    return result;
  } catch (error) {
    console.error('Telegram Network Error:', error);
    return null;
  }
};

export const sendOrderNotification = async (data: {
  username: string;
  service_name: string;
  category: string;
  link: string;
  quantity: number;
  amount: number;
}) => {
  const date_time = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' });
  const message = `🛠 <b>[ SYSTEM NOTIFICATION ]</b>
━━━━━━━━━━━━━━━━━━━━
⚡ <b>NEW ORDER PLACED!</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>User:</b> ${data.username}
📦 <b>Service:</b> ${data.service_name}
📂 <b>Category:</b> ${data.category}
━━━━━━━━━━━━━━━━━━━━
🔗 <b>Target:</b> ${data.link}
🔢 <b>Quantity:</b> ${data.quantity}
💰 <b>Charge:</b> ৳${data.amount.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━
🕒 <b>Time:</b> ${date_time}
🤖 Social Hub X BD - Auto Bot`;

  return sendMessage(message);
};

export const sendPaymentNotification = async (data: {
  payment_method: string;
  username: string;
  amount_taka: number;
  transaction_id: string;
}) => {
  const message = `💰 <b>[ NEW PAYMENT REQUEST ]</b>
━━━━━━━━━━━━━━━━━━━━
💳 <b>Method:</b> ${data.payment_method}
👤 <b>User:</b> ${data.username}
💵 <b>Amount:</b> ৳${data.amount_taka.toLocaleString()}
🔑 <b>TrxID:</b> ${data.transaction_id}
━━━━━━━━━━━━━━━━━━━━
⚠️ <b>Please verify manually and approve!</b>
━━━━━━━━━━━━━━━━━━━━`;

  return sendMessage(message);
};
