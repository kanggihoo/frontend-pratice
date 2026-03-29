import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          TS 4회차 — 동적 라우팅 params 타입
        </h1>
        <p className="text-gray-500 text-sm">
          Next.js 15+에서 <code className="bg-gray-100 px-1 rounded">params</code>가{" "}
          <code className="bg-gray-100 px-1 rounded">Promise</code>로 바뀐 이유와
          올바른 타이핑 방법을 학습합니다.
        </p>
        <div className="bg-gray-100 rounded-lg p-4 text-left text-sm font-mono text-gray-700 space-y-1">
          <p className="text-gray-400">{"// Next.js 14 (구 버전)"}</p>
          <p>{"async function Page({ params }) {"}</p>
          <p className="pl-4">{"const { id } = params; // 직접 접근"}</p>
          <p>{"}"}</p>
          <p className="mt-2 text-gray-400">{"// Next.js 15+ (현재)"}</p>
          <p>{"async function Page({ params }) {"}</p>
          <p className="pl-4">{"const { id } = await params; // await 필수"}</p>
          <p>{"}"}</p>
        </div>
        <Link
          href="/posts"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          블로그 목록 보기 →
        </Link>
      </div>
    </main>
  );
}
