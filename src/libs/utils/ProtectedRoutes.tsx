import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/libs/context/AuthContext";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Danh sách các vai trò được phép truy cập
}

const ProtectedRoutes = ({ children, allowedRoles }: ProtectedRoutesProps) => {
  const router = useRouter();
  const { user, loading } = useAuth(); // Lấy thông tin user từ context

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Nếu component chưa mount, không render gì
  if (!isMounted) {
    return null;
  }

  // Nếu đang tải thông tin người dùng, không render gì
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  // Kiểm tra nếu người dùng không có vai trò hợp lệ
  if (!allowedRoles.includes(user.role)) {
    router.push("/");
    return null;
  }

  return <>{children}</>; // Render nội dung nếu người dùng có quyền truy cập
};

export default ProtectedRoutes;
