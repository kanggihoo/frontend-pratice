import ImageCard from "./ImageCard";

export default function GalleryGrid({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-lg">이 카테고리에 이미지가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
