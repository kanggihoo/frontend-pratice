import DeleteButton from "./DeleteButton";

export default function GuestbookList({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">아직 남겨진 글이 없습니다.</p>
        <p className="text-sm mt-1">첫 번째 글을 남겨보세요!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* 작성자 이름 */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 font-bold text-sm rounded-full">
                  {entry.name.charAt(0)}
                </span>
                <span className="font-semibold text-gray-900">
                  {entry.name}
                </span>
                <time className="text-xs text-gray-400">
                  {new Date(entry.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              {/* 메시지 내용 */}
              <p className="text-gray-700 leading-relaxed pl-10">
                {entry.message}
              </p>
            </div>

            {/* 삭제 버튼 */}
            <DeleteButton id={entry.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
