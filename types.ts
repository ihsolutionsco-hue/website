export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  beds: number;
  guests: number;
  baths: number;
  type: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
}