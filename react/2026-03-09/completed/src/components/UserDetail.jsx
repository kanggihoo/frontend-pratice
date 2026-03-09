import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function UserDetail({ userId, apiBaseUrl, onBack }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const [userRes, postsRes] = await Promise.all([
          fetch(`${apiBaseUrl}/users/${userId}`, {
            signal: controller.signal,
          }),
          fetch(`${apiBaseUrl}/users/${userId}/posts`, {
            signal: controller.signal,
          }),
        ]);

        if (!userRes.ok || !postsRes.ok) {
          throw new Error("유저 정보를 불러오는 데 실패했습니다.");
        }

        const userData = await userRes.json();
        const postsData = await postsRes.json();

        setUser(userData);
        setPosts(postsData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();

    return () => {
      controller.abort();
    };
  }, [userId, apiBaseUrl]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        목록으로 돌아가기
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-slate-500">@{user.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <InfoItem
            icon="mail"
            label="이메일"
            value={user.email.toLowerCase()}
          />
          <InfoItem icon="phone" label="전화" value={user.phone} />
          <InfoItem icon="globe" label="웹사이트" value={user.website} />
          <InfoItem icon="building" label="회사" value={user.company.name} />
          <InfoItem
            icon="map"
            label="주소"
            value={`${user.address.street}, ${user.address.suite}, ${user.address.city}`}
          />
          <InfoItem
            icon="briefcase"
            label="사업 분야"
            value={user.company.catchPhrase}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          작성한 게시물 ({posts.length}개)
        </h3>
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
            >
              <h4 className="font-medium text-slate-800 mb-2 capitalize">
                {post.title}
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  const icons = {
    mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    phone:
      "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    globe:
      "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    building:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    map: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
    briefcase:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  };

  return (
    <div className="flex items-start gap-3">
      <svg
        className="w-5 h-5 text-slate-400 mt-0.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={icons[icon]}
        />
      </svg>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm text-slate-700">{value}</p>
      </div>
    </div>
  );
}
