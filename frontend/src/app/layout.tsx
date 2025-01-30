"use client";

import Header from "../components/Header";
import FloatingAddWidget from "../components/FloatingAddWidget";
import FloatingMessage from "../components/FloatingMessage";
import "./globals.css";
import axios from "axios";
import { AuthProvider } from "@/providers/Auth";
import { AppProvider } from "@/providers/App";
import { useState } from "react";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;

type MainLayoutProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: MainLayoutProps) {
  const [floatingMessageDismissed, setFloatingMessageDismissed] =
    useState(false);
  return (
    <html>
      <body>
        <AppProvider
          value={{ floatingMessageDismissed, setFloatingMessageDismissed }}
        >
          <AuthProvider>
            <Header />
            <FloatingMessage />
            <FloatingAddWidget />
            <div className="pt-16">{children}</div>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
