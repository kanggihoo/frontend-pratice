import PostListSkeleton from "./components/PostListSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-96 bg-gray-100 rounded mt-2 animate-pulse" />
      </div>
      <PostListSkeleton />
    </div>
  );
}
