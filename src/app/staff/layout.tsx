"use client";

import { DashboardLayout, PageContainer } from "@toolpad/core";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { NextAppProvider } from "@toolpad/core/nextjs";
import adminRoutes from "./dashboard-routes";
import { Box, createTheme } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import CustomerAccountMenu from "@/libs/components/dashboard/CustomerAccountMenu";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [session, setSession] = useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const [mounted, setMounted] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fd6773",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  // Don't render until client-side to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
