
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

const Home = () => {
  const router = useRouter();
  const { role } = useUser();

  useEffect(() => {
    // Redirect to appropriate home page based on role
    if (role === "admin") {
      router.replace("/admin/home");
    } else if (role === "user") {
      router.replace("/user/home");
    }
  }, [role, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
        <p className="text-sm text-gray-500 mt-2">
          Redirecting to {role} dashboard
        </p>
      </div>
    </div>
  );
};

export default Home;