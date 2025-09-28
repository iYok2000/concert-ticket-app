"use client";

import { useState } from "react";
import { ConcertGrid } from "./ConcertGrid";
import { ReservationHistory } from "./ReservationHistory";

type TabType = 'concerts' | 'reservations';

export const UserTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('concerts');

  const tabConfig = [
    { id: 'concerts' as TabType, label: 'All Concerts', component: ConcertGrid },
    { id: 'reservations' as TabType, label: 'My Reservations', component: ReservationHistory }
  ];

  const ActiveComponent = tabConfig.find(tab => tab.id === activeTab)?.component || ConcertGrid;

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabConfig.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <ActiveComponent />
      </div>
    </div>
  );
};
