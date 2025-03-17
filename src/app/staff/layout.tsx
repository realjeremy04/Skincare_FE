"use client";

import { DashboardLayout, PageContainer } from "@toolpad/core";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { NextAppProvider } from "@toolpad/core/nextjs";
import adminRoutes from "./dashboard-routes";
import { Box, createTheme } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import CustomerAccountMenu from "@/libs/components/dashboard/CustomerAccountMenu";
import Image from "next/image";
import useAuth from "@/libs/context/AuthContext";
import ProtectedRoutes from "@/libs/utils/ProtectedRoutes";
import { role } from "@/libs/constants/role";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, setUser, logout, loading } = useAuth();
  const [session, setSession] = useState({
    user: {
      name: user?.username,
      email: user?.email,
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const [mounted, setMounted] = useState(false);
  const theme = createTheme({
    palette: {
      primary: { main: "#fd6773" },
      secondary: { main: "#edf2ff" },
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      setSession({
        user: {
          name: user.username,
          email: user.email,
          image: "https://avatars.githubusercontent.com/u/19550456",
        },
      });
    }
  }, [user, loading]);

  const authentication = useMemo(() => {
    return {
      signIn: () => {},
      signOut: () => {
        logout();
      },
    };
  }, [logout]);

  if (!mounted || loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ProtectedRoutes allowedRoles={[role.STAFF, role.ADMIN]}>
        <AppCacheProvider>
          <NextAppProvider
            navigation={adminRoutes}
            authentication={authentication}
            branding={{
              logo: (
                <Image
                  src="/Logo-Noname.ico"
                  alt="Logo"
                  width={50}
                  height={100}
                />
              ),
              title: "",
              homeUrl: "/",
            }}
            session={session}
            theme={theme}
          >
            <DashboardLayout
              slotProps={{
                toolbarAccount: {
                  slots: { popoverContent: CustomerAccountMenu },
                },
              }}
            >
              <Box sx={{ width: "100%", height: "100vh" }}>
                <PageContainer>{children}</PageContainer>
              </Box>
            </DashboardLayout>
          </NextAppProvider>
        </AppCacheProvider>
      </ProtectedRoutes>
    </>
  );
}
