"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPosts, clearPosts } from "@/lib/features/postsSlice";

export default function PostsPage() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  const handleClear = () => {
    dispatch(clearPosts());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={handleRefresh}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts ({posts.length})</h1>
        <div className="space-x-2">
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">User ID: {post.userId}</p>
            <p className="text-gray-700 line-clamp-3">{post.body}</p>
          </div>
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-8">
          No posts available. Click refresh to load posts.
        </div>
      )}
    </div>
  );
}
