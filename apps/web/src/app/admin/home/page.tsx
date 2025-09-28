import { withRoleGuard } from "@/hoc/withRoleGuard";
import { ROLE_ARRAYS } from "@concert/shared";

function AdminHomePage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Events
            </h3>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-green-600">+2 this month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Active Bookings
            </h3>
            <p className="text-2xl font-bold text-gray-900">256</p>
            <p className="text-sm text-blue-600">+15 today</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-900">$12,450</p>
            <p className="text-sm text-green-600">+8.5% vs last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Pending Approvals
            </h3>
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-sm text-orange-600">Requires attention</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">Create Event</h3>
              <p className="text-sm text-gray-600">Add a new concert or event</p>
            </button>
            
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">Manage Venues</h3>
              <p className="text-sm text-gray-600">Configure venue settings</p>
            </button>
            
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">View Reports</h3>
              <p className="text-sm text-gray-600">Analytics and insights</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">New booking for "Rock Concert 2025"</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Confirmed
              </span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">Event "Jazz Night" updated</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                Updated
              </span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">New user registration</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                New User
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRoleGuard(AdminHomePage, ROLE_ARRAYS.ADMIN_ONLY);