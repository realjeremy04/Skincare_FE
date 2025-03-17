"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { UserCircle } from "lucide-react";
import useAuth from "@/libs/context/AuthContext";
import { useToast } from "@/components/quizcomopent/Quiz/ui/use-toast";

export const Header = () => {
  const router = useRouter();
  const { user, logout, checkAuthStatus } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out.",
      });
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = async (path: string) => {
    // Các trang yêu cầu đăng nhập
    const protectedRoutes = ["/quizPage", "/profile"];

    // Nếu là trang login/register, cho phép điều hướng trực tiếp
    if (path === "/login" || path === "/register") {
      router.push(path);
      return;
    }

    // Nếu là trang được bảo vệ
    if (protectedRoutes.includes(path)) {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to access this page.",
          variant: "destructive",
        });
        router.push("/login");
        return;
      }

      // Kiểm tra trạng thái đăng nhập trước khi điều hướng
      const isAuthenticated = await checkAuthStatus();
      if (!isAuthenticated) {
        toast({
          title: "Session Expired",
          description: "Please login again to continue.",
          variant: "destructive",
        });
        router.push("/login");
        return;
      }
    }

    // Nếu không phải trang được bảo vệ hoặc đã đăng nhập, cho phép điều hướng
    router.push(path);
  };
=======
import { 
  Avatar, 
  Menu, 
  MenuItem, 
  IconButton,
  CircularProgress 
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useAuth from "@/libs/context/AuthContext";

export const Header = () => {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    router.push("/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <div className="flex justify-center items-center py-4 px-6 w-full bg-stone-50">
        <CircularProgress sx={{ color: '#f87171' }} size={24} />
      </div>
    );
  }
>>>>>>> 0cd99cf1d0f352ef46c0e4b9c499eaecd4b06725

  return (
    <div className="flex flex-wrap gap-5 justify-between py-4 px-6 self-center w-full text-base bg-stone-50 text-red-400 max-md:max-w-full">
      <div
        className="flex justify-center items-center gap-1 font-medium cursor-pointer"
<<<<<<< HEAD
        onClick={() => handleNavigation("/")}
=======
        onClick={() => router.push("/")}
>>>>>>> 0cd99cf1d0f352ef46c0e4b9c499eaecd4b06725
      >
        <img
          loading="lazy"
          src="/Logo-Noname.png"
          className="object-contain shrink-0 self-start aspect-square w-16"
          alt="Skincare logo"
        />
        <div className="text-2xl">| Crystal Care</div>
      </div>
      
      <div className="flex flex-wrap gap-10 my-auto max-md:max-w-full">
        <nav className="flex gap-10 items-center my-auto font-medium text-lg">
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            Home
          </div>
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => handleNavigation("/about")}
          >
            About us
          </div>
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => handleNavigation("/contact")}
          >
            Contact
          </div>
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => handleNavigation("/treatment")}
          >
            Services
          </div>
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => handleNavigation("/quizPage")}
          >
            TestSkin
          </div>
        </nav>

        <div className="flex justify-center items-center border-l-2 border-l-red-400">
          {user ? (
<<<<<<< HEAD
            <div className="flex items-center gap-4 ml-4">
              <UserCircle
                className="w-6 h-6 cursor-pointer hover:text-red-500"
                onClick={() => handleNavigation("/profilePage")}
              />
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 disabled:opacity-50"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
=======
            <div className="flex items-center gap-2">
              <Avatar 
                alt={user.username || "User"}
                src={user.avatar || "/default-avatar.png"}
                sx={{ width: 40, height: 40 }}
                className="border-2 border-red-400"
              />
              <div className="flex items-center gap-1 cursor-pointer" onClick={handleMenuOpen}>
                <span className="font-medium text-lg">{user.username || "Profile"}</span>
                <IconButton size="small">
                  <ArrowDropDownIcon className="text-red-400" />
                </IconButton>
              </div>
              
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
>>>>>>> 0cd99cf1d0f352ef46c0e4b9c499eaecd4b06725
            </div>
          ) : (
            <>
              <div
                className="flex gap-1.5 justify-center items-center p-2.5 hover:underline cursor-pointer"
<<<<<<< HEAD
                onClick={() => handleNavigation("/login")}
=======
                onClick={() => router.push("/login")}
>>>>>>> 0cd99cf1d0f352ef46c0e4b9c499eaecd4b06725
              >
                Login
              </div>
              <div
                className="flex gap-1.5 justify-center items-center p-2.5 hover:underline cursor-pointer"
<<<<<<< HEAD
                onClick={() => handleNavigation("/register")}
=======
                onClick={() => router.push("/register")}
>>>>>>> 0cd99cf1d0f352ef46c0e4b9c499eaecd4b06725
              >
                Register
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};