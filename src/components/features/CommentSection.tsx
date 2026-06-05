import React, { useState } from "react";
import { ThumbsUp, Reply, Send, MoreHorizontal } from "lucide-react";
import { mockComments } from "@/constants/mockData";
import { currentUser } from "@/constants/mockData";
import type { Comment } from "@/types";
import { formatNumber } from "@/lib/utils";

interface CommentSectionProps {
  postId: string;
  count: number;
}

const CommentItem: React.FC<{ comment: Comment; depth?: number }> = ({ comment, depth = 0 }) => {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likes);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className={`flex gap-2 ${depth > 0 ? "ml-10 mt-2" : ""}`}>
      <div className="relative shrink-0">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        {comment.author.isOnline && (
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-gray-100 dark:bg-[#2D3741] rounded-2xl rounded-tl-[4px] px-3 py-2.5">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-[#000000E6] dark:text-white hover:text-[#0A66C2] cursor-pointer transition-colors">
                {comment.author.name}
              </span>
              {comment.author.isPremium && <span className="premium-badge">In</span>}
            </div>
            <button className="text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mb-1">{comment.author.headline}</p>
          <p className="text-sm text-[#000000E6] dark:text-white leading-relaxed">{comment.content}</p>
        </div>

        <div className="flex items-center gap-4 mt-1 px-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-xs font-semibold transition-all duration-150 hover:scale-105 ${liked ? "text-[#0A66C2]" : "text-[#666666] dark:text-[#B0B7BE] hover:text-[#0A66C2]"}`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${liked ? "fill-[#0A66C2]" : ""}`} />
            {likes > 0 && <span>{formatNumber(likes)}</span>}
            Like
          </button>
          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-center gap-1 text-xs font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#0A66C2] transition-colors"
          >
            <Reply className="w-3.5 h-3.5" />
            Reply
          </button>
          <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{comment.timestamp}</span>
        </div>

        {/* Reply Input */}
        {showReply && (
          <div className="flex items-center gap-2 mt-2 ml-1 animate-fade-in">
            <img src={currentUser.avatar} alt="You" className="w-7 h-7 rounded-full object-cover shrink-0" />
            <div className="flex-1 relative">
              <input
                autoFocus
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Add a reply..."
                className="w-full bg-gray-100 dark:bg-[#2D3741] rounded-full px-4 py-2 text-sm text-[#000000E6] dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0A66C2]/30 transition-all pr-10"
              />
              {replyText && (
                <button
                  onClick={() => { setReplyText(""); setShowReply(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A66C2]"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 ml-1">
            {!showReplies ? (
              <button
                onClick={() => setShowReplies(true)}
                className="flex items-center gap-1 text-xs font-semibold text-[#0A66C2] hover:underline"
              >
                <Reply className="w-3.5 h-3.5" />
                {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
              </button>
            ) : (
              <div className="space-y-2 animate-fade-in">
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} depth={1} />
                ))}
                <button
                  onClick={() => setShowReplies(false)}
                  className="text-xs font-semibold text-[#0A66C2] hover:underline ml-10"
                >
                  Hide replies
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({ postId, count }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [showAll, setShowAll] = useState(false);

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: currentUser,
      content: commentText,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const visible = showAll ? comments : comments.slice(0, 2);

  return (
    <div className="pt-3 space-y-3 animate-fade-in">
      {/* Input */}
      <div className="flex items-center gap-2 px-4">
        <div className="relative shrink-0">
          <img src={currentUser.avatar} alt="You" className="w-9 h-9 rounded-full object-cover" />
          <div className="online-dot scale-90" />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Add a comment…"
            className="w-full bg-gray-100 dark:bg-[#2D3741] border border-transparent focus:border-[#0A66C2] rounded-full px-4 py-2.5 text-sm text-[#000000E6] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#0A66C2]/20 transition-all pr-10"
          />
          {commentText && (
            <button
              onClick={handleSubmit}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A66C2] hover:text-[#0958A8] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Comments */}
      <div className="px-4 space-y-3">
        {visible.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mx-4 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors flex items-center gap-1"
        >
          {showAll ? "Show fewer comments" : `Load ${comments.length - 2} more comments`}
        </button>
      )}
    </div>
  );
};

export default CommentSection;
