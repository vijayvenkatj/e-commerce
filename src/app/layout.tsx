"use client"
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import {Footer} from "@/components/footer/footer";
import { Banner } from "@/components/banner/Banner";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
      <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
        <Banner />
        <Navbar />
        {children}
        <Footer />
        </Provider>
      </body>
      </html>
  );
}
