"use client";

import { useRouter } from "next/navigation";
import { ShieldX, ArrowLeft, Home, UserCheck } from "lucide-react";
import useUser from "@/hooks/useUser";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { role, switchRole } = useUser();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    if (role === "admin") {
      router.push("/admin/home");
    } else {
      router.push("/user/home");
    }
  };

  const handleSwitchRole = () => {
    switchRole();
    // Redirect to appropriate home after role switch
    setTimeout(() => {
      const newRole = role === "admin" ? "user" : "admin";
      if (newRole === "admin") {
        router.push("/admin/home");
      } else {
        router.push("/user/home");
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Icon and Status */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <ShieldX className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>

        {/* Current Role Info */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Current Role</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {role}
                </p>
              </div>
            </div>
            <button
              onClick={handleSwitchRole}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Switch Role
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </button>

          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact the administrator or try switching your role.
          </p>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Quick Tip
          </h3>
          <p className="text-sm text-blue-800">
            You can switch between Admin and User roles using the "Switch Role" button above to access different parts of the application.
          </p>
        </div>
      </div>
    </div>
  );
}