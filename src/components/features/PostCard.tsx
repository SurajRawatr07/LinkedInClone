import React, { useState } from "react";
import {
  ThumbsUp, MessageCircle, Repeat2, Send,
  MoreHorizontal, Globe, Bookmark, BookmarkCheck,
  ChevronDown, ChevronUp, X, Copy, Share2,
  UserPlus, UserMinus, Flag, EyeOff, Link2, Check
} from "lucide-react";
import type { Post } from "@/types";
import { formatNumber } from "@/lib/utils";
import CommentSection from "./CommentSection";

const REACTIONS = [
  { key: "like", emoji: "👍", label: "Like", color: "#0A66C2" },
  { key: "celebrate", emoji: "🎉", label: "Celebrate", color: "#6B7CFF" },
  { key: "support", emoji: "🤝", label: "Support", color: "#57A0D3" },
  { key: "love", emoji: "💙", label: "Love", color: "#E0245E" },
  { key: "insightful", emoji: "💡", label: "Insightful", color: "#F5A623" },
  { key: "funny", emoji: "😄", label: "Funny", color: "#F5A623" },
];

interface PostCardProps {
  post: Post;
}

// Simple toast hook
let toastTimeout: ReturnType<typeof setTimeout> | null = null;

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [reposted, setReposted] = useState(post.isReposted);
  const [repostCount, setRepostCount] = useState(post.reposts);
  const [saved, setSaved] = useState(post.isSaved);
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(post.isLiked ? "like" : null);
  const [expanded, setExpanded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [following, setFollowing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => setToast(null), 2500);
  };

  const TEXT_LIMIT = 280;
  const isLong = post.content.length > TEXT_LIMIT;
  const displayContent = expanded || !isLong ? post.content : post.content.slice(0, TEXT_LIMIT) + "...";

  const handleLike = (reactionKey?: string) => {
    const key = reactionKey || "like";
    if (activeReaction === key) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      setActiveReaction(null);
    } else {
      if (!activeReaction) setLikeCount(likeCount + 1);
      setLiked(true);
      setActiveReaction(key);
    }
    setShowReactions(false);
  };

  const handleSave = () => {
    setSaved(!saved);
    showToast(saved ? "Post removed from saved items" : "Post saved to your list");
    setShowMenu(false);
  };

  const handleRepost = () => {
    setReposted(!reposted);
    setRepostCount(reposted ? repostCount - 1 : repostCount + 1);
    showToast(reposted ? "Repost removed" : "Reposted to your followers");
  };

  const handleCopyLink = () => {
    setCopied(true);
    showToast("Link copied to clipboard!");
    setShowShareMenu(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFollow = () => {
    setFollowing(!following);
    showToast(following ? `Unfollowed ${post.author.name}` : `Following ${post.author.name}`);
    setShowMenu(false);
  };

  const currentReaction = REACTIONS.find(r => r.key === activeReaction);

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(#\w+|@\w+)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith("#") || part.startsWith("@")) {
              return (
                <span key={j} className="text-[#0A66C2] hover:underline cursor-pointer font-medium">
                  {part}
                </span>
              );
            }
            return part;
          })}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <article className="card overflow-hidden animate-fade-in hover:shadow-card-hover transition-shadow duration-300 relative">
      {/* Toast */}
      {toast && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-[#1D2226] dark:bg-white text-white dark:text-[#1D2226] text-xs font-semibold px-4 py-2 rounded-full shadow-lg animate-slide-down whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="relative shrink-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-600 cursor-pointer hover:opacity-90 transition-opacity"
            />
            {post.author.isOnline && (
              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-1.5">
              <button className="font-bold text-[#000000E6] dark:text-white text-sm hover:text-[#0A66C2] dark:hover:text-[#5B9DD9] transition-colors">
                {post.author.name}
              </button>
              {post.author.isVerified && <span className="verified-badge shrink-0">✓</span>}
              {post.author.isPremium && <span className="premium-badge shrink-0">In</span>}
            </div>
            <p className="text-xs text-[#666666] dark:text-[#B0B7BE] line-clamp-1 mt-0.5">{post.author.headline}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{post.timestamp}</span>
              <span className="text-[#666666] text-[11px]">·</span>
              <Globe className="w-3 h-3 text-[#666666] dark:text-[#B0B7BE]" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          {post.author.id !== "u1" && (
            <button
              onClick={handleFollow}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 border ${
                following
                  ? "border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE]"
                  : "border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10"
              }`}
            >
              {following ? <><UserMinus className="w-3.5 h-3.5" />Following</> : <><UserPlus className="w-3.5 h-3.5" />Follow</>}
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => { setShowMenu(!showMenu); setShowShareMenu(false); }}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <MoreHorizontal className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
            </button>
            {showMenu && (
              <div className="absolute top-full right-0 mt-1 w-60 bg-white dark:bg-[#1D2226] rounded-xl shadow-card-hover border border-gray-100 dark:border-gray-700 z-20 animate-slide-down overflow-hidden">
                {[
                  {
                    label: saved ? "Unsave post" : "Save post",
                    icon: saved ? BookmarkCheck : Bookmark,
                    action: handleSave,
                    color: saved ? "text-[#0A66C2]" : undefined
                  },
                  {
                    label: following ? `Unfollow ${post.author.name}` : `Follow ${post.author.name}`,
                    icon: following ? UserMinus : UserPlus,
                    action: handleFollow,
                  },
                  {
                    label: "Copy link to post",
                    icon: Link2,
                    action: handleCopyLink,
                  },
                  {
                    label: "Not interested in this",
                    icon: EyeOff,
                    action: () => { showToast("Post hidden"); setShowMenu(false); }
                  },
                  {
                    label: "Report post",
                    icon: Flag,
                    action: () => { showToast("Report submitted"); setShowMenu(false); },
                    color: "text-red-500"
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#38434F] transition-colors text-left text-sm"
                  >
                    <item.icon className={`w-4 h-4 shrink-0 ${item.color || "text-[#666666] dark:text-[#B0B7BE]"}`} />
                    <span className={item.color || "text-[#000000E6] dark:text-white"}>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <div className="text-sm text-[#000000E6] dark:text-white leading-relaxed whitespace-pre-line">
          {renderContent(displayContent)}
        </div>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white mt-1 transition-colors"
          >
            {expanded ? <><ChevronUp className="w-4 h-4" />…see less</> : <><ChevronDown className="w-4 h-4" />…see more</>}
          </button>
        )}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.hashtags.slice(0, 4).map(tag => (
              <button key={tag} className="text-xs font-semibold text-[#0A66C2] dark:text-[#5B9DD9] hover:underline">
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Post image ${i + 1}`}
                className="w-full shrink-0 object-cover max-h-[400px]"
              />
            ))}
          </div>
          {post.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage(Math.max(0, currentImage - 1))}
                disabled={currentImage === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center disabled:opacity-30 transition-all text-lg"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentImage(Math.min(post.images!.length - 1, currentImage + 1))}
                disabled={currentImage === post.images.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center disabled:opacity-30 transition-all text-lg"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {post.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`rounded-full transition-all ${i === currentImage ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/60"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Reaction Stats */}
      <div className="px-4 py-2 flex items-center justify-between">
        <button className="flex items-center gap-1 hover:underline group">
          {post.topReactions.length > 0 && (
            <div className="flex -space-x-1">
              {post.topReactions.map((r, i) => (
                <span key={i} className="w-5 h-5 bg-white dark:bg-[#2D3741] rounded-full flex items-center justify-center text-[11px] shadow-sm border border-white dark:border-gray-600 z-[calc(3-i)]">
                  {r}
                </span>
              ))}
            </div>
          )}
          <span className="text-[13px] text-[#666666] dark:text-[#B0B7BE] group-hover:text-[#0A66C2] transition-colors ml-1">
            {formatNumber(likeCount)}
          </span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-[13px] text-[#666666] dark:text-[#B0B7BE] hover:text-[#0A66C2] hover:underline transition-colors"
          >
            {formatNumber(post.comments)} comments
          </button>
          <span className="text-[#666666] text-xs">·</span>
          <button className="text-[13px] text-[#666666] dark:text-[#B0B7BE] hover:text-[#0A66C2] hover:underline transition-colors">
            {formatNumber(repostCount)} reposts
          </button>
          {saved && (
            <span className="flex items-center gap-0.5 text-[11px] text-[#0A66C2] dark:text-[#5B9DD9] font-semibold">
              <Bookmark className="w-3 h-3 fill-current" />Saved
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-100 dark:border-gray-700 px-2 py-1 flex items-center justify-around">
        {/* Like with Reaction Hover */}
        <div
          className="relative"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <button
            onClick={() => handleLike()}
            className={`reaction-btn ${liked ? "text-[#0A66C2] dark:text-[#5B9DD9]" : ""}`}
          >
            {currentReaction ? (
              <span className="text-lg leading-none">{currentReaction.emoji}</span>
            ) : (
              <ThumbsUp className={`w-5 h-5 ${liked ? "fill-[#0A66C2] dark:fill-[#5B9DD9]" : ""}`} />
            )}
            <span>{currentReaction?.label || "Like"}</span>
          </button>

          {/* Reaction Picker */}
          {showReactions && (
            <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-[#1D2226] rounded-full shadow-card-hover border border-gray-100 dark:border-gray-700 px-3 py-2 flex items-center gap-2 animate-bounce-in z-30">
              {REACTIONS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => handleLike(r.key)}
                  title={r.label}
                  className="text-2xl hover:scale-150 transition-transform duration-150 origin-bottom cursor-pointer relative group"
                >
                  {r.emoji}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`reaction-btn ${showComments ? "text-[#000000E6] dark:text-white" : ""}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>

        <button
          onClick={handleRepost}
          className={`reaction-btn ${reposted ? "text-green-600" : ""}`}
        >
          <Repeat2 className={`w-5 h-5 ${reposted ? "text-green-600" : ""}`} />
          <span className="hidden sm:inline">{reposted ? "Reposted" : "Repost"}</span>
        </button>

        {/* Send / Share */}
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="reaction-btn"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
          {showShareMenu && (
            <div className="absolute bottom-full right-0 mb-2 w-52 bg-white dark:bg-[#1D2226] rounded-xl shadow-card-hover border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-down z-30">
              {[
                { icon: <Send className="w-4 h-4" />, label: "Send in a message", action: () => { showToast("Shared in message"); setShowShareMenu(false); } },
                { icon: <Share2 className="w-4 h-4" />, label: "Share to feed", action: () => { showToast("Shared to your feed"); setShowShareMenu(false); } },
                { icon: copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />, label: copied ? "Link copied!" : "Copy link", action: handleCopyLink },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#38434F] transition-colors text-left text-sm text-[#000000E6] dark:text-white"
                >
                  <span className="text-[#666666] dark:text-[#B0B7BE]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-gray-100 dark:border-gray-700 py-3">
          <CommentSection postId={post.id} count={post.comments} />
        </div>
      )}
    </article>
  );
};

export default PostCard;
