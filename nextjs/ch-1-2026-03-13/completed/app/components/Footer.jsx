export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">NovaTech</h3>
            <p className="text-sm leading-relaxed">
              혁신적인 기술로 비즈니스의 디지털 전환을 선도하는 IT 솔루션
              파트너입니다.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">바로가기</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  홈
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  회사 소개
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  문의하기
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">연락처</h4>
            <ul className="space-y-2 text-sm">
              <li>서울시 강남구 테헤란로 123</li>
              <li>02-1234-5678</li>
              <li>contact@novatech.kr</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; 2026 NovaTech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
