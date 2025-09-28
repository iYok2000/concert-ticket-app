
"use client";

import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import { useNavigation } from "@/hooks/useNavigation";

const Home = () => {
  const { role } = useUser();
  const { goToHome } = useNavigation();

  useEffect(() => {
    // Redirect to appropriate home page based on role
    goToHome();
  }, [role, goToHome]);

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