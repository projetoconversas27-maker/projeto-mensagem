export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isVip: boolean;
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  SYSTEM = 'SYSTEM'
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: number;
  type: MessageType;
  likes: number;
  isVip?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
  isSponsored?: boolean;
  attendees: number;
}