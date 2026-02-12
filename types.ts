
export enum OrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  PARTIAL = 'Partial',
  REFUNDED = 'Refunded',
  CANCELED = 'Canceled'
}

export enum TransactionStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed'
}

export interface Service {
  id: number;
  name: string;
  category: string;
  ratePer1000: number;
  min: number;
  max: number;
  avgTime: string;
  description: string;
  providerId?: string;
  originalRate?: number;
}

export interface Category {
  id: number;
  name: string;
  created_at?: string;
}

export interface ReferralTransaction {
  id: number;
  referrer_id: string;
  referee_username: string;
  order_amount: number;
  commission_amount: number;
  created_at: string;
}

export interface User {
  id?: string;
  username: string;
  balance: number;
  totalSpent: number;
  activeOrders: number;
  role: 'admin' | 'user';
  email?: string;
  avatar_url?: string;
  referred_by?: string;
  referral_earnings?: number;
  invitation_code?: string;
}

export interface BroadcastNotification {
  id: number;
  title: string;
  message: string;
  image_url: string;
  redirect_link: string;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  date: string;
  link: string;
  charge: number;
  startCount: number;
  quantity: number;
  service: string;
  status: OrderStatus;
  username: string;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  method: string;
  amount: number;
  txId: string;
  status: TransactionStatus;
  username: string;
}

export type View = 
  | 'landing' 
  | 'auth' 
  | 'dashboard' 
  | 'new-order' 
  | 'services' 
  | 'orders' 
  | 'add-funds' 
  | 'funds-history'
  | 'refer-earn'
  | 'profile'
  | 'architecture'
  | 'admin-dashboard'
  | 'admin-orders'
  | 'admin-users'
  | 'admin-services'
  | 'admin-categories'
  | 'admin-payments'
  | 'admin-broadcast'
  | 'admin-settings';
