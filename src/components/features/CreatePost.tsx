import React, { useState, useRef } from "react";
import { Image, FileText, Calendar, BarChart2, X, Send, Smile } from "lucide-react";
import { currentUser } from "@/constants/mockData";

type PostMode = "text" | "image" | "poll" | "event" | "article";

const CreatePost: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<PostMode>("text");
  const [content, setContent] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!content.trim()) return;
    setContent("");
    setIsExpanded(false);
    setMode("text");
  };

  if (!isExpanded) {
    return (
      <div className="card p-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-600" />
            <div className="online-dot" />
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className="flex-1 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 rounded-full px-4 py-2.5 text-sm text-[#666666] dark:text-[#B0B7BE] text-left hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-150 font-medium"
          >
            Start a post, try writing with AI ✨
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          {[
            { icon: Image, label: "Media", color: "text-blue-500" },
            { icon: Calendar, label: "Event", color: "text-yellow-500" },
            { icon: FileText, label: "Article", color: "text-red-500" },
            { icon: BarChart2, label: "Poll", color: "text-green-500" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => { setIsExpanded(true); setMode(item.label.toLowerCase() as PostMode); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hidden sm:block">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-[#000000E6] dark:text-white text-base">Create a post</h3>
        <button
          onClick={() => { setIsExpanded(false); setContent(""); setMode("text"); }}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
        </button>
      </div>

      <div className="p-4">
        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="online-dot" />
          </div>
          <div>
            <p className="font-bold text-[#000000E6] dark:text-white text-sm">{currentUser.name}</p>
            <button className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-0.5 text-xs font-semibold text-[#000000E6] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              🌍 Anyone · <span className="text-[#0A66C2]">▼</span>
            </button>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
          {(["text", "image", "poll", "event", "article"] as PostMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                mode === m
                  ? "bg-[#0A66C2] text-white"
                  : "border border-gray-200 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:border-[#0A66C2] hover:text-[#0A66C2] dark:hover:text-[#5B9DD9]"
              }`}
            >
              {m === "text" ? "✏️ Text" : m === "image" ? "🖼 Media" : m === "poll" ? "📊 Poll" : m === "event" ? "📅 Event" : "📝 Article"}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {mode !== "poll" && mode !== "event" && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              mode === "article"
                ? "Write your article headline here..."
                : "What do you want to talk about?"
            }
            rows={mode === "article" ? 6 : 4}
            className="w-full bg-transparent text-[#000000E6] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none outline-none text-base leading-relaxed"
          />
        )}

        {/* Poll Mode */}
        {mode === "poll" && (
          <div className="space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ask your audience a question..."
              rows={2}
              className="w-full bg-transparent text-[#000000E6] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none outline-none text-base leading-relaxed border-b border-gray-200 dark:border-gray-600 pb-3"
            />
            <div className="space-y-2 mt-2">
              {pollOptions.map((opt, i) => (
                <div key={i} className="relative">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const next = [...pollOptions];
                      next[i] = e.target.value;
                      setPollOptions(next);
                    }}
                    placeholder={`Option ${i + 1}`}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#2D3741] text-[#000000E6] dark:text-white outline-none focus:border-[#0A66C2] transition-colors"
                  />
                </div>
              ))}
              {pollOptions.length < 4 && (
                <button
                  onClick={() => setPollOptions([...pollOptions, ""])}
                  className="text-sm font-semibold text-[#0A66C2] hover:underline"
                >
                  + Add option
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-[#666666] dark:text-[#B0B7BE]">Poll duration:</span>
              <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-[#2D3741] text-[#000000E6] dark:text-white outline-none">
                <option>1 week</option>
                <option>3 days</option>
                <option>1 day</option>
              </select>
            </div>
          </div>
        )}

        {/* Event Mode */}
        {mode === "event" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Event name *"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-[#2D3741] text-[#000000E6] dark:text-white outline-none focus:border-[#0A66C2] transition-colors"
            />
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-[#2D3741] text-[#000000E6] dark:text-white outline-none focus:border-[#0A66C2] transition-colors" />
              <input type="time" className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-[#2D3741] text-[#000000E6] dark:text-white outline-none focus:border-[#0A66C2] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Add event description..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-[#2D3741] text-[#000000E6] dark:text-white outline-none focus:border-[#0A66C2] transition-colors"
            />
          </div>
        )}

        {/* Image Upload */}
        {mode === "image" && (
          <div
            onClick={() => fileRef.current?.click()}
            className="mt-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/5 transition-all"
          >
            <Image className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#000000E6] dark:text-white">Select files to begin</p>
            <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-1">Share images or a single video in your post</p>
            <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" multiple />
          </div>
        )}

        {/* Character count */}
        {content && mode !== "poll" && (
          <div className="flex justify-end mt-2">
            <span className={`text-xs ${content.length > 2800 ? "text-red-500" : "text-[#666666] dark:text-[#B0B7BE]"}`}>
              {content.length}/3000
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={() => fileRef.current?.click()}>
            <Image className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Smile className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <BarChart2 className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!content.trim() && mode === "text"}
          className="flex items-center gap-2 bg-[#0A66C2] hover:bg-[#0958A8] disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold px-5 py-2 rounded-full text-sm transition-all duration-200 active:scale-95"
        >
          <Send className="w-4 h-4" />
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
