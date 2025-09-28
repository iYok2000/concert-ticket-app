"use client";

import { withRoleGuard } from '@/hoc/withRoleGuard';
import { ROLE_ARRAYS } from '@concert/shared';
import { UserTabs } from '@/components/user/UserTabs';
import useUser from '@/hooks/useUser';

const UserHomePage = () => {
  const { switchRole } = useUser();

  const handleRoleSwitch = () => {
    switchRole();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Concert Tickets</h1>
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                User
              </span>
            </div>
            
            <button
              onClick={handleRoleSwitch}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Switch to Admin
            </button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Concert Booking</h2>
          <p className="text-gray-600">
            Discover amazing concerts and book your tickets. Manage your reservations easily.
          </p>
        </div>

        <UserTabs />
      </main>
    </div>
  );
};

export default withRoleGuard(UserHomePage, ROLE_ARRAYS.USER_ONLY);
