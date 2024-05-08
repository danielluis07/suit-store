import { StaticImageData } from "next/image";

export interface User {
  id: string;
  storeId: string;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
  orders?: Order[];
  reviews?: Review[];
}

export interface Account {
  id: string;
  user: User;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
}

export interface VerificationToken {
  id: string;
  email: string;
  token: string;
  expires: string;
}

export interface PasswordResetToken {
  id: string;
  email: string;
  token: string;
  expires: string;
}

export interface TwoFactorToken {
  id: string;
  email: string;
  token: string;
  expires: string;
}

export interface TwoFactorConfirmation {
  id: string;
  user: User;
  userId: string;
}

export interface Order {
  id: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  isRefunded: boolean;
  isShipped: boolean;
  number: number;
  postalCode: string;
  state: string;
  status: string;
  storeId: string;
  store: Store;
  logisticStatus: string;
  userId: string;
  trackId: string;
  user: User;
  orderItems: OrderItem[];
  isPaid: boolean;
  paidAt: Date;
  shippingDate: string;
  shippingMethod: ShippingMethod;
  shippingMethodId: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  estimatedTime: string;
  shippingCost: number;
  orders: Order[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  order: string;
  productId: string;
  product: Product;
  sizeId: string;
  imageUrl: string;
  size: Size[];
}

export interface Store {
  id: string;
  name: string;
  userId: string;
  billboards: Billboard[];
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  products: Product[];
  orders: Order[];
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  storeId: string;
  store: Store;
  categoryId: string;
  category: Category;
  productSizes: ProductSize[];
  description: string;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  isNew: boolean;
  reviews: Review[];
  sizeId: string;
  sizes: Size[] | string;
  color?: Color | undefined;
  colorId: string;
  stock: number;
  images: Image[];
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartProduct {
  id: string;
  storeId: string;
  store: Store;
  categoryId: string;
  category: Category;
  productSizes: ProductSize[];
  description: string;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  isNew: boolean;
  reviews: Review[];
  sizeId: string;
  size: {
    id: string;
    name: string;
    quantity: number;
    value: string;
  };
  color?: Color | undefined;
  colorId: string;
  stock: number;
  images: Image[];
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductSize {
  productId: string;
  product: Product;
  sizeId: string;
  size: Size;
  quantity: number;
}

export interface Image {
  id: string;
  productId: string;
  product: Product;
  url: string | StaticImageData;
  createdAt: string;
  updatedAt: string;
}

export interface Billboard {
  id: string;
  storeId: string;
  store: Store;
  label: string;
  description: string | null;
  imageUrl: string;
  categories?: Category[];
  createdAt: string;
  updatetAt: string;
}

export interface Review {
  id: string;
  storeId: string;
  text: string;
  rating: number;
  hasReply: boolean;
  reply?: string;
  replyAt: string;
  user: User;
  userId: string;
  product: Product;
  isArchived: boolean;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  storeId: string;
  store: Store;
  imageUrl: string;
  value: string;
  billboardId: string;
  billboard: Billboard;
  products: Product[];
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  id: string;
  storeId: string;
  store: Store;
  quantity: number;
  name: string;
  productSizes: ProductSize[];
  orderItems: OrderItem[];
  value: string;
  productId: string;
  products: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  id: string;
  storeId: string;
  store: Store;
  name: string;
  value: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}
