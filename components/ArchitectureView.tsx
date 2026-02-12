
import React from 'react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="glass-panel p-8">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center italic tracking-tighter">
          <i className="fa-solid fa-sitemap text-neonCyan mr-4"></i>
          TECHNICAL ARCHITECTURE: SOCIAL HUB X BD
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-electricBlue uppercase italic tracking-widest">System Overview</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Social Hub X BD is built as a highly scalable, decoupled microservices-ready architecture. 
              The frontend is a React SPA for zero-latency interactions, while 
              the backend logic is optimized for massive concurrent order processing.
            </p>
            <ul className="space-y-2 text-xs text-gray-400 font-bold uppercase tracking-wide">
              <li><i className="fa-solid fa-check text-green-500 mr-2"></i> Queue Worker: Redis for multi-threaded order sync.</li>
              <li><i className="fa-solid fa-check text-green-500 mr-2"></i> Database: MySQL 8.0 with optimized indexing.</li>
              <li><i className="fa-solid fa-check text-green-500 mr-2"></i> Cache Layer: Laravel Memcached for service lists.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-electricBlue uppercase italic tracking-widest">Stack Recommendation</h3>
            <div className="bg-charcoal/50 p-4 rounded-xl border border-white/5">
              <p className="text-xs font-black text-gray-300 mb-2 uppercase tracking-widest">Primary: Laravel 10 (PHP)</p>
              <p className="text-[10px] text-gray-500 leading-relaxed font-medium uppercase">
                Robust Eloquent ORM for financial transactions and 
                native support for Job Queues critical for SMM providers.
              </p>
            </div>
            <div className="bg-charcoal/50 p-4 rounded-xl border border-white/5">
              <p className="text-xs font-black text-gray-300 mb-2 uppercase tracking-widest">Notification Engine: Telegram Bot API</p>
              <p className="text-[10px] text-gray-500 leading-relaxed font-medium uppercase">
                Low-latency administrative alerts for new orders and deposits.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8">
        <h3 className="text-xl font-black text-white uppercase italic tracking-widest mb-6">Telegram Notification Service (PHP)</h3>
        <p className="text-gray-400 text-xs mb-4 uppercase font-bold tracking-widest italic">Official Integration Logic</p>
        <div className="bg-charcoal p-8 rounded-[2rem] border border-white/10 font-mono text-xs overflow-x-auto custom-scrollbar">
          <pre className="text-neonCyan">
{`<?php
/**
 * Social Hub X BD - Official Telegram Notification Engine
 * Sends strictly styled notifications for New Orders & Payment Requests
 */

function sendTelegramNotification($type, $data) {
    // Configuration - Set your credentials here
    $botToken = "8426020467:AAH-hVYfS7ryK13vxEKUzUQHJy0QvQnVpjU";
    $chatID   = "7236181886";
    $date_time = date('Y-m-d H:i:s');
    $message = "";

    if ($type === 'order') {
        // Task 1: Order Notification Style
        $message  = "🛠 [ SYSTEM NOTIFICATION ]\n";
        $message .= "━━━━━━━━━━━━━━━━━━━━\n";
        $message .= "⚡ NEW ORDER PLACED!\n";
        $message .= "━━━━━━━━━━━━━━━━━━━━\n";
        $message .= "👤 User: {$data['username']}\n";
        $message .= "📦 Service: {$data['service_name']}\n";
        $message .= "📂 Category: {$data['category']}\n";
        $message .= "━━━━━━━━━━━━━━━━━━━━\n";
        $message .= "🔗 Target: {$data['link']}\n";
        $message .= "🔢 Quantity: {$data['quantity']}\n";
        $message .= "💰 Charge: ৳{$data['amount']}\n";
        $message .= "━━━━━━━━━━━━━━━━━━━━\n";
        $message .= "🕒 Time: {$date_time}\n";
        $message .= "🤖 Social Hub X BD - Auto Bot";
    } 
    else if ($type === 'payment') {
        // Task 2: Add Funds (Payment) Notification Style
        $message  = "💰 [ NEW PAYMENT REQUEST ]\n";
        $message .= "━━━━━━━━━━━━━━━━━━━━\n";
        $message .= "💳 Method: {$data['payment_method']}\n";
        $message .= "👤 User: {$data['username']}\n";
        $message .= "💵 Amount: ৳{$data['amount_taka']}\n";
        $message .= "🔑 TrxID: {$data['transaction_id']}\n";
        $message .= "━━━━━━━━━━━━━━━━━━━━\n";
        $message .= "⚠️ Please verify manually and approve!\n";
        $message .= "━━━━━━━━━━━━━━━━━━━━";
    }

    // Telegram API Endpoint
    $url = "https://api.telegram.org/bot" . $botToken . "/sendMessage";
    
    // cURL Execution
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'chat_id'    => $chatID,
        'text'       => $message,
        'parse_mode' => 'HTML'
    ]);
    
    $response = curl_exec($ch);
    $error    = curl_error($ch);
    curl_close($ch);
    
    return $response;
}

/**
 * TRIGGER EXAMPLES
 */

// Example: Calling for New Order
// sendTelegramNotification('order', [
//     'username'     => 'User123',
//     'service_name' => 'FB Followers',
//     'category'     => 'Facebook',
//     'link'         => 'https://fb.com/profile',
//     'quantity'     => '1000',
//     'amount'       => '50.00'
// ]);

// Example: Calling for Payment Request
// sendTelegramNotification('payment', [
//     'payment_method' => 'bKash',
//     'username'       => 'User123',
//     'amount_taka'    => '500',
//     'transaction_id' => 'BKW82910XJ'
// ]);
?>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
