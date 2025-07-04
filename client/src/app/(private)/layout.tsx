"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/molecules/sidebar";
import MobileSidebar from "@/components/molecules/mobileSidebar";
import Navbar from "@/components/molecules/navbar";
import { AuthProvider } from "../hooks";

type TProps = {
  children?: React.ReactNode;
};
const PrivateLayout: React.FC<TProps> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    <AuthProvider>
      <div className="w-full max-w-full min-h-screen bg-gray-100">
        <Sidebar />
        <Navbar />
        <MobileSidebar />
        <div className="lg:pl-72 w-full max-w-full">
          <main className="py-6 w-full max-w-full ">
            <div className="px-4 sm:px-6 lg:px-8 w-full">{children}</div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};
export default PrivateLayout;
