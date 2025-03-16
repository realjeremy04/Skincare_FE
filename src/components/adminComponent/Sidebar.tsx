import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Info,
  RoomService,
  ManageAccounts,
  ListAlt,
  Login,
  PersonAdd,
} from "@mui/icons-material";

// Định nghĩa kiểu props cho SidebarItem
interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  link?: string;
  onClick?: () => void;
}

export const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-64 min-h-screen bg-pink-100 text-pink-700 flex flex-col py-6 px-4 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <img
          src="/Logo-Noname.png"
          className="w-12 h-12 object-contain"
          alt="Logo"
        />
        <span className="text-2xl font-bold">Crystal Care</span>
      </div>

      {/* Menu chính */}
      <nav className="flex flex-col gap-4">
        <SidebarItem
          icon={<Home fontSize="small" />}
          text="Trang chủ"
          link="#"
        />
        <SidebarItem
          icon={<Info fontSize="small" />}
          text="Về chúng tôi"
          link="#"
        />
        <SidebarItem
          icon={<RoomService fontSize="small" />}
          text="Các dịch vụ"
          link="#"
        />

        {/* Quản lý - Staff/Admin */}
        <div className="mt-4 border-t border-pink-300 pt-4">
          <p className="text-sm font-semibold text-pink-500 mb-2">Quản lý</p>
          <SidebarItem
            icon={<ManageAccounts fontSize="small" />}
            text="Quản lý người dùng"
            link="#"
          />
          <SidebarItem
            icon={<ListAlt fontSize="small" />}
            text="Quản lý đơn hàng"
            link="#"
          />
        </div>

        {/* Tài khoản */}
        <div className="mt-4 border-t border-pink-300 pt-4">
          <p className="text-sm font-semibold text-pink-500 mb-2">Tài khoản</p>
          <SidebarItem
            icon={<Login fontSize="small" />}
            text="Đăng nhập"
            onClick={() => router.push("/login")}
          />
          <SidebarItem
            icon={<PersonAdd fontSize="small" />}
            text="Đăng ký"
            onClick={() => router.push("/register")}
          />
        </div>
      </nav>
    </div>
  );
};

// Component item trong Sidebar
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  link,
  onClick,
}) => {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-200 transition"
      onClick={onClick}
    >
      {icon}
      {link ? (
        <a href={link} className="flex-1">
          {text}
        </a>
      ) : (
        <span className="flex-1">{text}</span>
      )}
    </div>
  );
};
