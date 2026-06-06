import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import CreatePost 
interface HomePageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [posts, setPosts] = useState(mockPosts);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (loadingMore || page >= 4) return;
    setLoadingMore(true);
    setTimeout(() => {
      setPosts(prev => [
        ...prev,
        ...mockPosts.map(p => ({ ...p, id: `${p.id}-${page + 1}` })),
      ]);
      setPage(prev => prev + 1);
      setLoadingMore(false);
    }, 1000);
  }, [loadingMore, page]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} notificationCount={3} messageCount={3} />

      <main className="max-w-[1128px] mx-auto px-4 pt-16 pb-20 md:pb-4">
        <div className="flex gap-4 mt-4">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-[225px] shrink-0 space-y-2 sticky top-16 h-fit max-h-[calc(100vh-72px)] overflow-y-auto hide-scrollbar">
            <LeftSidebar />
          </aside>

          {/* Feed */}
          <div className="flex-1 min-w-0 max-w-[555px] mx-auto lg:mx-0 space-y-2">
            {loading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : (
              <>
                <CreatePost />
                {/* Story Highlights */}
                <div className="card p-4">
                  <h3 className="text-sm font-bold text-[#000000E6] dark:text-white mb-3">Stories & Highlights</h3>
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                    {[
                      { name: "Add story", avatar: null, isAdd: true },
                      { name: "Marcus J.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", isAdd: false },
                      { name: "Sarah W.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face", isAdd: false },
                      { name: "David P.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face", isAdd: false },
                      { name: "Emily R.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face", isAdd: false },
                    ].map((story, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center relative ${story.isAdd ? "border-2 border-dashed border-[#0A66C2]" : "ring-2 ring-[#0A66C2] ring-offset-2 dark:ring-offset-[#1D2226]"}`}>
                          {story.isAdd ? (
                            <div className="w-full h-full rounded-full bg-[#EAF4FF] dark:bg-[#0A66C2]/20 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                              <span className="text-2xl text-[#0A66C2] font-light">+</span>
                            </div>
                          ) : (
                            <img src={story.avatar!} alt={story.name} className="w-full h-full rounded-full object-cover" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#666666] dark:text-[#B0B7BE] text-center w-14 truncate">{story.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 px-1">
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  <span className="text-sm text-[#666666] dark:text-[#B0B7BE]">Sort by:</span>
                  <button className="flex items-center gap-1 text-sm font-bold text-[#000000E6] dark:text-white hover:text-[#0A66C2] transition-colors">
                    Top ▾
                  </button>
                </div>

                {/* Trending Hashtags */}
                <div className="card p-4">
                  <h3 className="text-sm font-bold text-[#000000E6] dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-[#0A66C2]">#</span> Trending for you
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["#ReactJS", "#TypeScript", "#OpenSource", "#DSA", "#FrontendDev", "#JavaScript", "#TechJobs"].map((tag) => (
                      <button
                        key={tag}
                        className="text-xs font-semibold bg-[#EEF3F8] dark:bg-[#38434F] text-[#0A66C2] dark:text-[#5B9DD9] px-3 py-1.5 rounded-full hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/20 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}

                {/* Sentinel */}
                <div ref={sentinelRef} className="h-4" />

                {loadingMore && (
                  <div className="space-y-2">
                    <PostSkeleton />
                    <PostSkeleton />
                  </div>
                )}

                {page >= 4 && (
                  <p className="text-center text-sm text-[#666666] dark:text-[#B0B7BE] py-4">
                    You're all caught up! 🎉
                  </p>
                )}
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-[300px] shrink-0 sticky top-16 h-fit max-h-[calc(100vh-72px)] overflow-y-auto hide-scrollbar">
            <RightSidebar />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
