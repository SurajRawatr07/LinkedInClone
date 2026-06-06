import React, { useState, useRef, useEffect } from "react";
import {
  SearcrchQuery, setSearchQuery] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"Focused" | "Other">("Focused");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Simulate typing indicator
  useEffect(() => {
    if (!selectedConv) return;
    const t = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(t);
  }, [messages, selectedConv]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) setShowEmoji(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedConv]);

  const sendMessage = () => {
    if (!messageText.trim() || !selectedConv) return;
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      senderId: currentUser.id,
      content: messageText.trim(),
      timestamp: "Just now",
      isRead: false,
      type: "text",
    };
    setMessages(prev => [...prev, newMsg]);
    setMessageText("");
    setShowEmoji(false);
    setConversations(prev =>
      prev.map(c => c.id === selectedConv.id ? { ...c, unreadCount: 0 } : c)
    );
    // Simulate reply typing
    setTimeout(() => setIsTyping(true), 800);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "That sounds great! Let me think about it.",
        "Absolutely! I'll get back to you soon.",
        "👍 Thanks for sharing!",
        "Interesting perspective! 🔥",
      ];
      const reply: Message = {
        id: `msg${Date.now()}-reply`,
        senderId: selectedConv.participant.id,
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: "Just now",
        isRead: true,
        type: "text",
      };
      setMessages(prev => [...prev, reply]);
    }, 2500);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const selectConv = (conv: Conversation) => {
    setSelectedConv(conv);
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
    setShowMobileChat(true);
  };

  const filteredConvs = conversations.filter(c =>
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} messageCount={totalUnread} />

      <main className="max-w-[1000px] mx-auto px-4 pt-16 pb-20 md:pb-4">
        <div className="mt-4 h-[calc(100vh-120px)] flex rounded-card overflow-hidden shadow-card bg-white dark:bg-[#1D2226]">

          {/* Conversation List */}
          <div className={`w-full md:w-[320px] md:flex flex-col border-r border-gray-100 dark:border-gray-700 shrink-0 ${showMobileChat ? "hidden" : "flex"}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-[#000000E6] dark:text-white">Messaging</h2>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Edit className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#EEF3F8] dark:bg-[#38434F] rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages"
                  className="bg-transparent text-sm text-[#000000E6] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none flex-1"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              {(["Focused", "Other"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`flex-1 py-2.5 text-sm font-semibold border-b-2 transition-all ${
                    activeFilter === tab
                      ? "border-[#0A66C2] text-[#0A66C2] dark:text-[#5B9DD9]"
                      : "border-transparent text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConvs.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => selectConv(conv)}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-[#2D3741] transition-colors text-left border-b border-gray-50 dark:border-gray-800/50 group ${
                    selectedConv?.id === conv.id ? "bg-[#EAF4FF] dark:bg-[#0A66C2]/10 border-l-2 border-l-[#0A66C2]" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={conv.participant.avatar} alt={conv.participant.name} className="w-12 h-12 rounded-full object-cover" />
                    {conv.isOnline && <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />}
                    {conv.isPinned && <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0A66C2] rounded-full flex items-center justify-center"><span className="text-[8px] text-white">📌</span></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-sm ${conv.unreadCount > 0 ? "font-bold text-[#000000E6] dark:text-white" : "font-semibold text-[#000000E6] dark:text-white"} truncate`}>
                        {conv.participant.name}
                      </span>
                      <span className={`text-[11px] shrink-0 ml-2 ${conv.unreadCount > 0 ? "font-bold text-[#0A66C2]" : "text-[#666666] dark:text-[#B0B7BE]"}`}>
                        {conv.lastMessage.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate flex-1 ${conv.unreadCount > 0 ? "font-semibold text-[#000000E6] dark:text-white" : "text-[#666666] dark:text-[#B0B7BE]"}`}>
                        {conv.lastMessage.senderId === currentUser.id ? "You: " : ""}
                        {conv.lastMessage.content}
                      </p>
                      <div className="flex items-center gap-1 ml-2 shrink-0">
                        {conv.unreadCount > 0 && (
                          <span className="min-w-[20px] h-5 bg-[#0A66C2] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                            {conv.unreadCount}
                          </span>
                        )}
                        {conv.isPinned && <Star className="w-3 h-3 text-[#0A66C2] opacity-0 group-hover:opacity-100 transition-opacity" />}
                        <Archive className="w-3.5 h-3.5 text-[#666666] dark:text-[#B0B7BE] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {filteredConvs.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-sm text-[#666666] dark:text-[#B0B7BE]">No conversations found</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Window */}
          {selectedConv ? (
            <div className={`flex-1 flex flex-col ${!showMobileChat ? "hidden md:flex" : "flex"}`}>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 shrink-0">
                <button
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-1"
                >
                  <ArrowLeft className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
                <div className="relative">
                  <img
                    src={selectedConv.participant.avatar}
                    alt={selectedConv.participant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedConv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#000000E6] dark:text-white text-sm">{selectedConv.participant.name}</p>
                  <p className="text-xs text-[#666666] dark:text-[#B0B7BE] truncate">
                    {selectedConv.isOnline ? (
                      <span className="text-green-500">Active now</span>
                    ) : (
                      selectedConv.participant.headline
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Phone className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Video className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Info className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Date divider */}
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE] font-medium shrink-0">Yesterday</span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                </div>

                {messages.map((msg, i) => {
                  const isSent = msg.senderId === currentUser.id || msg.senderId === "u1";
                  const prevMsg = messages[i - 1];
                  const showAvatar = !isSent && (!prevMsg || prevMsg.senderId !== msg.senderId);
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 animate-fade-in ${isSent ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {!isSent && (
                        <div className="w-8 h-8 shrink-0">
                          {showAvatar && (
                            <img src={selectedConv.participant.avatar} alt={selectedConv.participant.name} className="w-8 h-8 rounded-full object-cover" />
                          )}
                        </div>
                      )}
                      <div className={`flex flex-col gap-1 max-w-[70%] ${isSent ? "items-end" : "items-start"}`}>
                        <div className={isSent ? "chat-bubble-sent" : "chat-bubble-received"}>
                          {msg.content}
                        </div>
                        <div className={`flex items-center gap-1 ${isSent ? "flex-row-reverse" : "flex-row"}`}>
                          <span className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">{msg.timestamp}</span>
                          {isSent && (
                            msg.isRead
                              ? <CheckCheck className="w-3 h-3 text-[#0A66C2]" />
                              : <Check className="w-3 h-3 text-[#666666] dark:text-[#B0B7BE]" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-end gap-2 animate-fade-in">
                    <img src={selectedConv.participant.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div className="chat-bubble-received flex items-center gap-1 py-3">
                      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-100 dark:border-gray-700 p-3 shrink-0">
                <div className="flex items-end gap-2">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Image className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Paperclip className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                    </button>
                    <div ref={emojiRef} className="relative">
                      <button
                        onClick={() => setShowEmoji(!showEmoji)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Smile className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                      </button>
                      {showEmoji && (
                        <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-[#1D2226] rounded-xl shadow-card-hover border border-gray-100 dark:border-gray-700 p-2 grid grid-cols-5 gap-1 w-48 z-30 animate-bounce-in">
                          {EMOJI_LIST.map(emoji => (
                            <button
                              key={emoji}
                              onClick={() => { setMessageText(prev => prev + emoji); setShowEmoji(false); textareaRef.current?.focus(); }}
                              className="text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-1 transition-colors hover:scale-125 transform"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Mic className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                    </button>
                  </div>
                  <div className="flex-1 bg-[#EEF3F8] dark:bg-[#38434F] rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#0A66C2]/30 transition-all">
                    <textarea
                      ref={textareaRef}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Write a message…"
                      rows={1}
                      style={{ resize: "none" }}
                      className="w-full bg-transparent text-sm text-[#000000E6] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none max-h-32 overflow-y-auto"
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!messageText.trim()}
                    className="p-2.5 bg-[#0A66C2] hover:bg-[#0958A8] disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full transition-all duration-200 active:scale-90"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-4 text-center p-8">
              <div className="w-20 h-20 bg-[#EAF4FF] dark:bg-[#0A66C2]/20 rounded-full flex items-center justify-center">
                <Send className="w-10 h-10 text-[#0A66C2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#000000E6] dark:text-white">Select a message</h3>
                <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mt-1">
                  Choose from your existing conversations or start a new one
                </p>
              </div>
              <button className="bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold px-6 py-2.5 rounded-full transition-all duration-200">
                New message
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MessagingPage;
