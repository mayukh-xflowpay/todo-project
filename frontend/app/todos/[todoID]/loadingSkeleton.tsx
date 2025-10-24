import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse p-8 bg-white border border-gray-200 rounded-xl shadow-sm max-w-2xl mx-auto mt-8">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

      {/* Status badge */}
      <div className="h-5 w-16 bg-gray-200 rounded-full mb-6"></div>

      {/* Description lines */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-10/12"></div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Created/Updated lines */}
      <div className="flex gap-8">
        <div className="h-3 bg-gray-200 rounded w-40"></div>
        <div className="h-3 bg-gray-200 rounded w-40"></div>
      </div>
    </div>
  );
}
