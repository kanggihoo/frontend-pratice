// ─── [NotificationList.jsx] ──────────────────────────────────────
// 알림 목록 컴포넌트입니다.
// useTheme() Context를 사용하고, 알림 읽음 상태를 useState로 관리합니다.

import { useState } from "react";
import { useTheme } from "./ThemeContext.jsx";
import { notifications as initialNotifications } from "../data/mockData.js";

export default function NotificationList() {
  // ─── [Context & 상태] ─────────────────────────────────────────
  // useTheme()에서 colors를 가져오세요.
  // notifications 상태를 useState로 관리하세요. (초기값: initialNotifications)

  // TODO: useTheme()에서 colors 가져오기
  const { colors } = useTheme();

  // TODO: notifications 상태 선언
  const [notifications, setNotifications] = useState(initialNotifications);

  // ─── [알림 읽음 처리 함수] ─────────────────────────────────────
  // markAsRead(id): 특정 알림을 읽음 처리하는 함수
  //   - notifications 배열에서 해당 id의 알림만 read: true로 변경
  //   - 힌트: prev.map(n => n.id === id ? { ...n, read: true } : n)
  //
  // markAllAsRead(): 모든 알림을 읽음 처리하는 함수
  //   - 모든 알림의 read를 true로 변경
  //   - 힌트: prev.map(n => ({ ...n, read: true }))

  // TODO: markAsRead 함수 작성
  const markAsRead = (id) => {
    // TODO: 특정 알림 읽음 처리
  };

  // TODO: markAllAsRead 함수 작성
  const markAllAsRead = () => {
    // TODO: 전체 알림 읽음 처리
  };

  // ─── [읽지 않은 알림 수 계산] ──────────────────────────────────
  // filter()를 사용하여 read가 false인 알림의 개수를 구하세요.
  // 힌트: notifications.filter(n => !n.read).length

  // TODO: unreadCount 계산
  const unreadCount = 0;

  return (
    <div className={`${colors.bgCard} ${colors.border} border rounded-xl p-5 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-bold ${colors.text}`}>
          알림{" "}
          {/* ─── [읽지 않은 알림 배지] ───────────────────────── */}
          {/* unreadCount > 0일 때만 빨간 배지를 표시하세요. */}
          {/* TODO: 조건부 렌더링으로 배지 표시 */}
        </h3>
        {/* ─── [모두 읽음 버튼] ──────────────────────────────── */}
        {/* unreadCount > 0일 때만 "모두 읽음" 버튼을 표시하세요. */}
        {/* onClick에 markAllAsRead 함수를 연결하세요. */}
        {/* TODO: 조건부 렌더링으로 "모두 읽음" 버튼 표시 */}
      </div>

      <div className="space-y-3">
        {/* ─── [알림 리스트 렌더링] ──────────────────────────── */}
        {/* notifications 배열을 map()으로 순회하며 각 알림을 렌더링하세요. */}
        {/* 각 알림을 클릭하면 markAsRead(notification.id)가 호출됩니다. */}
        {/* notification.read 여부에 따라 스타일을 다르게 적용하세요: */}
        {/*   - 읽은 알림: opacity-60, 📭 아이콘 */}
        {/*   - 읽지 않은 알림: border-l-4 border-indigo-500, 📬 아이콘, font-semibold */}

        {/* TODO: notifications.map()으로 알림 목록 렌더링 */}
      </div>
    </div>
  );
}
