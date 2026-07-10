export interface MenuItem {
  id: string;
  name: string;
  price: string;
  rating: number;
  description: string;
  image: string;
  tag?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface KeunggulanItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
