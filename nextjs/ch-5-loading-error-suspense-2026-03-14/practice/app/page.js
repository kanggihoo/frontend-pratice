import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* 히어로 섹션 */}
      <section className="text-center py-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl text-white">
        <h1 className="text-4xl font-bold mb-4">
          로딩, 에러 UI & Suspense 학습
        </h1>
        <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
          Next.js App Router의{" "}
          <code className="bg-white/20 px-2 py-1 rounded">loading.js</code>,{" "}
          <code className="bg-white/20 px-2 py-1 rounded">error.js</code>,{" "}
          <code className="bg-white/20 px-2 py-1 rounded">not-found.js</code>{" "}
          파일과 React Suspense를 활용한 스트리밍 렌더링을 체험합니다.
        </p>
        <Link
          href="/posts"
          className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          게시글 피드 보러가기 →
        </Link>
      </section>

      {/* 핵심 개념 카드 */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-3">⏳</div>
          <h3 className="font-bold text-lg mb-2">loading.js</h3>
          <p className="text-gray-600 text-sm">
            데이터를 불러오는 동안 자동으로 표시되는 로딩 UI입니다. React Suspense를
            기반으로 동작하며, 파일 하나만 만들면 됩니다.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-3">🚨</div>
          <h3 className="font-bold text-lg mb-2">error.js</h3>
          <p className="text-gray-600 text-sm">
            런타임 에러 발생 시 자동으로 렌더링되는 에러 경계(Error Boundary)입니다.
            사용자에게 친절한 에러 메시지와 복구 버튼을 제공합니다.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-3">🔍</div>
          <h3 className="font-bold text-lg mb-2">not-found.js</h3>
          <p className="text-gray-600 text-sm">
            존재하지 않는 리소스에 접근했을 때 표시되는 404 페이지입니다.{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">notFound()</code>{" "}
            함수를 호출하여 트리거합니다.
          </p>
        </div>
      </section>

      {/* Suspense 스트리밍 설명 */}
      <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">🌊 Suspense 스트리밍 렌더링</h2>
        <p className="text-gray-600 mb-4">
          React{" "}
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">
            &lt;Suspense&gt;
          </code>
          를 사용하면 페이지의 일부분만 먼저 보여주고, 나머지는 데이터가 준비되면
          점진적으로 렌더링할 수 있습니다. 이를{" "}
          <strong>스트리밍 렌더링</strong>이라 부릅니다.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          <pre className="text-gray-700">{`<Suspense fallback={<SkeletonUI />}>
  <SlowDataComponent />  {/* 데이터 로딩 중엔 SkeletonUI 표시 */}
</Suspense>`}</pre>
        </div>
      </section>

      {/* 체험 가이드 */}
      <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
        <h2 className="text-xl font-bold mb-3 text-indigo-800">
          🧪 체험 가이드
        </h2>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>
              <Link href="/posts" className="underline font-medium">
                /posts
              </Link>{" "}
              페이지를 방문하여 로딩 스켈레톤 UI가 표시된 후 게시글이 나타나는 것을
              확인하세요.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>
              게시글을 클릭하면 상세 페이지에서도 Suspense 기반 스트리밍을 체험할 수
              있습니다.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>
              <Link href="/posts/999" className="underline font-medium">
                /posts/999
              </Link>
              를 방문하여 not-found 페이지를 확인하세요.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>
              게시글 상세에서 &quot;에러 시뮬레이션&quot; 버튼을 클릭하여 error.js
              동작을 확인하세요.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
