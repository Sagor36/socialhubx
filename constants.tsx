
import React from 'react';
import { Service, Order, OrderStatus, PaymentTransaction, TransactionStatus, User } from './types';

export const MOCK_SERVICES: Service[] = [
  // Facebook
  { id: 1001, name: 'Facebook Post Sad Reactions', category: 'Facebook', ratePer1000: 20, min: 10, max: 100000, avgTime: '30m', description: 'Express sadness with high-quality reactions.', originalRate: 15 },
  { id: 1002, name: 'Facebook Post Love Reactions', category: 'Facebook', ratePer1000: 20, min: 10, max: 100000, avgTime: '30m', description: 'Send love with high-quality reactions.', originalRate: 15 },
  { id: 1003, name: 'Facebook Profile/Page Like', category: 'Facebook', ratePer1000: 50, min: 100, max: 50000, avgTime: '2h', description: 'Stable likes for your profile or fan page.', originalRate: 40 },
  { id: 1004, name: 'Facebook Comments (No Refill)', category: 'Facebook', ratePer1000: 100, min: 5, max: 1000, avgTime: '5h', description: 'Custom comments to boost engagement.', originalRate: 80 },
  { id: 1005, name: 'Facebook Post Wow Reactions', category: 'Facebook', ratePer1000: 20, min: 10, max: 100000, avgTime: '30m', description: 'Surprise reactions for your posts.', originalRate: 15 },
  { id: 1006, name: 'Facebook Post Like', category: 'Facebook', ratePer1000: 20, min: 10, max: 100000, avgTime: '15m', description: 'Super fast post likes.', originalRate: 12 },
  { id: 1007, name: 'Facebook Follower (Real Account)', category: 'Facebook', ratePer1000: 30, min: 100, max: 500000, avgTime: '1h', description: 'Real profile followers from Bangladesh.', originalRate: 22 },

  // Instagram
  { id: 2001, name: 'Instagram Post Like', category: 'Instagram', ratePer1000: 30, min: 50, max: 100000, avgTime: '10m', description: 'High quality Instagram likes.', originalRate: 20 },
  { id: 2002, name: 'Instagram Reel View', category: 'Instagram', ratePer1000: 20, min: 100, max: 1000000, avgTime: '5m', description: 'Fast views to boost your reels into discovery.', originalRate: 12 },
  { id: 2003, name: 'Instagram Follower (Real Account)', category: 'Instagram', ratePer1000: 150, min: 100, max: 50000, avgTime: '4h', description: 'High retention real followers.', originalRate: 120 },

  // TikTok
  { id: 3001, name: 'TikTok Video Like', category: 'TikTok', ratePer1000: 20, min: 100, max: 500000, avgTime: '15m', description: 'Boost your TikTok algorithm with real likes.', originalRate: 14 },
  { id: 3002, name: 'TikTok Follower (Real Account)', category: 'TikTok', ratePer1000: 120, min: 100, max: 100000, avgTime: '6h', description: 'Organic-looking followers for your TikTok profile.', originalRate: 90 },
  { id: 3003, name: 'TikTok Video View', category: 'TikTok', ratePer1000: 20, min: 1000, max: 5000000, avgTime: '2m', description: 'Instant TikTok views.', originalRate: 5 },

  // YouTube
  { id: 4001, name: 'YouTube Video View', category: 'YouTube', ratePer1000: 25, min: 1000, max: 10000000, avgTime: '12h', description: 'Monetization-safe high retention views.', originalRate: 18 },
  { id: 4002, name: 'YouTube Like (Refill 30 Days)', category: 'YouTube', ratePer1000: 30, min: 50, max: 50000, avgTime: '1h', description: 'Stable YouTube likes with refill guarantee.', originalRate: 22 },
  { id: 4003, name: 'YouTube Comments (No Refill)', category: 'YouTube', ratePer1000: 100, min: 10, max: 1000, avgTime: '8h', description: 'Engage your audience with comments.', originalRate: 75 },

  // Telegram
  { id: 5001, name: 'Telegram Post View', category: 'Telegram', ratePer1000: 15, min: 100, max: 1000000, avgTime: '5m', description: 'Fast views for your Telegram posts.', originalRate: 8 },
  { id: 5002, name: 'Telegram Member (Real Account)', category: 'Telegram', ratePer1000: 100, min: 100, max: 50000, avgTime: '2h', description: 'Active Telegram channel/group members.', originalRate: 80 },
  { id: 5003, name: 'Telegram Member (Bot Account)', category: 'Telegram', ratePer1000: 30, min: 500, max: 100000, avgTime: '10m', description: 'Cheapest way to increase member count.', originalRate: 15 },
  { id: 5004, name: 'Telegram Post View + Like', category: 'Telegram', ratePer1000: 30, min: 100, max: 500000, avgTime: '15m', description: 'Combined engagement for Telegram posts.', originalRate: 20 },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-9001', date: '2024-05-16 14:20', link: 'https://fb.com/p/8291', charge: 20, startCount: 0, quantity: 1000, service: 'Facebook Post Like', status: OrderStatus.COMPLETED, username: 'Elite_User' },
  { id: 'ORD-9002', date: '2024-05-16 16:10', link: 'https://tg.me/channel_x', charge: 100, startCount: 450, quantity: 1000, service: 'Telegram Member (Real)', status: OrderStatus.IN_PROGRESS, username: 'Sagor_X' },
];

export const MOCK_USERS: User[] = [
  { username: 'Sagor_X', balance: 12402, totalSpent: 45000, activeOrders: 5, role: 'user', email: 'sagor@example.com' },
  { username: 'Elite_User', balance: 8500, totalSpent: 125000, activeOrders: 12, role: 'user', email: 'elite@example.com' },
];

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  { id: 'TX-9901', date: '2024-05-16 10:00', method: 'bKash', amount: 1000, txId: 'BKW82910XJ', status: TransactionStatus.COMPLETED, username: 'Sagor_X' },
];

export const CATEGORIES = ['All', 'Facebook', 'Instagram', 'YouTube', 'TikTok', 'Telegram', 'Twitter'];

export const PAYMENT_METHODS = [
  { id: 'bkash', name: 'bKash', icon: 'fa-mobile-screen', color: '#D12053', type: 'local', phone: '01408461902', bonus: '10% Bonus' },
  { id: 'nagad', name: 'Nagad', icon: 'fa-mobile-retro', color: '#F7941D', type: 'local', phone: '01408461902' },
  { id: 'rocket', name: 'Rocket', icon: 'fa-building-columns', color: '#8C3494', type: 'local', phone: '01959289905' },
  { id: 'binance', name: 'Binance (USDT)', icon: 'fa-bitcoin-sign', color: '#F3BA2F', type: 'crypto', phone: 'shx-wallet-address' },
];

export const LOGO_SVG = (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L80 80M80 20L20 80" stroke="#00F5FF" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="5" fill="#007BFF" />
    <circle cx="80" cy="80" r="5" fill="#007BFF" />
    <circle cx="80" cy="20" r="5" fill="#007BFF" />
    <circle cx="20" cy="80" r="5" fill="#007BFF" />
    <circle cx="50" cy="50" r="3" fill="#ffffff" />
  </svg>
);
