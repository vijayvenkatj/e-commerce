"use client"
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { DashboardCard} from "@/components/DashboardCard/DashboardCard";


export default function Home() {
  return (
    <>
      <DashboardCard />
    </>
  );
}
