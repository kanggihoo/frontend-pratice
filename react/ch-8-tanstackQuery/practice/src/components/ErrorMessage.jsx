export default function ErrorMessage({ message = "오류가 발생했습니다." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
        <span className="text-red-400 text-3xl">!</span>
      </div>
      <p className="text-red-400 text-center">{message}</p>
      <p className="text-gray-500 text-sm mt-2">
        잠시 후 다시 시도해주세요.
      </p>
    </div>
  );
}
