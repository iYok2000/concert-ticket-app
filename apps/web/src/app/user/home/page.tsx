"use client";
import { withRoleGuard } from "@/hoc/withRoleGuard";

function UserHomePage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome to Concert Tickets
        </h1>
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Discover Amazing Events</h2>
          <p className="text-lg mb-6">Find and book tickets for the best concerts and events in your city</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Browse Events
          </button>
        </div>

        {/* Featured Events */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Event Card 1 */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-red-400 to-pink-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Rock Concert 2025</h3>
                <p className="text-gray-600 mb-4">An epic night of rock music with top bands</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">March 15, 2025</p>
                    <p className="text-sm text-gray-500">Bangkok Arena</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">$45</p>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Jazz Night</h3>
                <p className="text-gray-600 mb-4">Smooth jazz evening with renowned artists</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">March 20, 2025</p>
                    <p className="text-sm text-gray-500">Jazz Club</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">$35</p>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pop Festival</h3>
                <p className="text-gray-600 mb-4">The biggest pop music festival of the year</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">April 2, 2025</p>
                    <p className="text-sm text-gray-500">Central Park</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">$65</p>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Bookings Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Recent Bookings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Rock Concert 2025</h3>
                <p className="text-sm text-gray-600">2 tickets • Section A, Row 5</p>
                <p className="text-xs text-gray-500">Booked on Feb 28, 2025</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Confirmed
                </span>
                <p className="text-sm text-gray-600 mt-1">$90</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Jazz Night</h3>
                <p className="text-sm text-gray-600">1 ticket • VIP Section</p>
                <p className="text-xs text-gray-500">Booked on Feb 25, 2025</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Upcoming
                </span>
                <p className="text-sm text-gray-600 mt-1">$35</p>
              </div>
            </div>
            
            <div className="text-center py-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View All Bookings →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRoleGuard(UserHomePage, ["user"]);