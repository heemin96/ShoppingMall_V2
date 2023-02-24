import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

//로그인한 사용자가 있는지 확인
//그 사용자가 어드민 권한이 있는지 확인
//requireAdmin이 true인 경우에는 로그인도 되어있어야 하고, 어드민 권한도 가지고 있어야 함
//조건에 맞지 않으면 / 상위 경로로 이동!
//조건에 맞는 경우에만 전달된 children 보여줌
// 그렇다면 뭘 해야 하냐? -> context를 써야함 ㅇㅇ
