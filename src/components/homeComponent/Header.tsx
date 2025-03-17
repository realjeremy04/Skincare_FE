"use client";

import React from "react";
import { useRouter } from "next/navigation";
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

  return (
    <div className="flex flex-wrap gap-5 justify-between py-4 px-6 self-center w-full text-base bg-stone-50 text-red-400 max-md:max-w-full">
      <div
        className="flex justify-center items-center gap-1 font-medium cursor-pointer"
        onClick={() => router.push("/")}
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
            onClick={() => router.push("/")}
          >
            Home
          </div>
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => router.push("/about")}
          >
            About us
          </div>
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => router.push("/contact")}
          >
            Contact
          </div>
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => router.push("/treatment")}
          >
            Services
          </div>
          <div
            className="self-stretch my-auto hover:underline cursor-pointer"
            onClick={() => router.push("/quizPage")}
          >
            TestSkin
          </div>
        </nav>

        <div className="flex justify-center items-center border-l-2 border-l-red-400">
          {user ? (
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
            </div>
          ) : (
            <>
              <div
                className="flex gap-1.5 justify-center items-center p-2.5 hover:underline cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login
              </div>
              <div
                className="flex gap-1.5 justify-center items-center p-2.5 hover:underline cursor-pointer"
                onClick={() => router.push("/register")}
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