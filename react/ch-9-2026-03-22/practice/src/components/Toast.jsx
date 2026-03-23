export default function Toast({ message, type = "success" }) {
  const bgColor =
    type === "error"
      ? "bg-red-600/90 border-red-400/30"
      : "bg-emerald-600/90 border-emerald-400/30";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out]">
      <div
        className={`${bgColor} backdrop-blur-sm border text-white px-5 py-3 rounded-xl shadow-2xl`}
      >
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
