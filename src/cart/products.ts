export interface Product {
  productId: string;
  productName: string;
  price: number;
  description: string;
  imageUrl?: string;
}

export const PRODUCTS: Product[] = [
  {
    productId: "product-001",
    productName: "ワイヤレスヘッドホン",
    price: 8980,
    description: "UnsplashのYearOneが撮影した写真 ",
    imageUrl: "/product1.jpg",
  },
  {
    productId: "product-002",
    productName: "スマートウォッチ",
    price: 15800,
    description: "UnsplashのRachit Tankが撮影した写真",
    imageUrl: "/product2.jpg",
  },
  {
    productId: "product-003",
    productName: "ノートPC",
    description: "UnsplashのKari Sheaが撮影した写真",
    price: 89800,
    imageUrl: "/product3.jpg",
  },
];
