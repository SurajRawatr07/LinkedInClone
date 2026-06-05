import React from "react";

export const PostSkeleton: React.FC = () => (
  <div className="card p-4 space-y-3 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="skeleton w-12 h-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-1/4 rounded" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="skeleton h-4 w-4/6 rounded" />
    </div>
    <div className="skeleton h-48 w-full rounded-xl" />
    <div className="flex justify-around pt-2 border-t border-gray-100 dark:border-gray-700">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton h-8 w-16 rounded-lg" />
      ))}
    </div>
  </div>
);

export const ProfileCardSkeleton: React.FC = () => (
  <div className="card overflow-hidden">
    <div className="skeleton h-16 w-full" />
    <div className="px-4 pb-4">
      <div className="skeleton w-16 h-16 rounded-full -mt-8 mb-2" />
      <div className="space-y-2">
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>
    </div>
  </div>
);

export const JobCardSkeleton: React.FC = () => (
  <div className="card p-4 space-y-3 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="skeleton w-12 h-12 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-3 w-2/5 rounded" />
      </div>
    </div>
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-6 w-16 rounded-full" />
      ))}
    </div>
  </div>
);

export const NotificationSkeleton: React.FC = () => (
  <div className="flex items-start gap-3 p-4 animate-pulse">
    <div className="skeleton w-14 h-14 rounded-full shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="skeleton h-4 w-4/5 rounded" />
      <div className="skeleton h-3 w-1/3 rounded" />
    </div>
  </div>
);
