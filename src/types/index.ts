export interface User {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  coverImage?: string;
  location: string;
  connectionCount: number;
  followerCount: number;
  followingCount: number;
  isConnected: boolean;
  isFollowing: boolean;
  isPremium: boolean;
  isVerified: boolean;
  isOnline: boolean;
  profileViews: number;
  postImpressions: number;
  email: string;
  phone?: string;
  website?: string;
  about?: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  isLiked: boolean;
  isReposted: boolean;
  isSaved: boolean;
  reactions: {
    like: number;
    celebrate: number;
    support: number;
    love: number;
    insightful: number;
    funny: number;
  };
  topReactions: string[];
  hashtags?: string[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  salary?: string;
  description: string;
  skills: string[];
  applicants: number;
  postedDate: string;
  isEasyApply: boolean;
  isSaved: boolean;
  isNew?: boolean;
  matchScore?: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: "text" | "image" | "file";
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
  isOnline: boolean;
  isPinned?: boolean;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "connection" | "job" | "message" | "birthday" | "anniversary" | "mention" | "repost";
  actor: User;
  content: string;
  timestamp: string;
  isRead: boolean;
  postPreview?: string;
  actionUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  skills?: string[];
}

export interface Education {
  id: string;
  school: string;
  schoolLogo: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade?: string;
  activities?: string;
}

export interface Skill {
  id: string;
  name: string;
  endorsements: number;
  endorsed: boolean;
  category: "Top" | "Industry" | "Other";
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerLogo: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  readers: number;
  timeAgo: string;
  category: string;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: "person" | "company" | "job" | "skill" | "group";
  avatar?: string;
  subtitle?: string;
}
