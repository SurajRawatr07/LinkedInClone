import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatConnectionCount(count: number): string {
  if (count >= 500) return "500+";
  return count.toString();
}

export function getTimeAgo(timestamp: string): string {
  return timestamp;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export const REACTION_EMOJIS: Record<string, string> = {
  like: "👍",
  celebrate: "🎉",
  support: "🤝",
  love: "💙",
  insightful: "💡",
  funny: "😄",
};

export const REACTION_LABELS: Record<string, string> = {
  like: "Like",
  celebrate: "Celebrate",
  support: "Support",
  love: "Love",
  insightful: "Insightful",
  funny: "Funny",
};
