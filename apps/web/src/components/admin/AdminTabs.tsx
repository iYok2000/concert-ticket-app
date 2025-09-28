import { AdminDashboardTab } from '@/types/admin';

interface AdminTabsProps {
  activeTab: AdminDashboardTab['id'];
  onTabChange: (tab: AdminDashboardTab['id']) => void;
}

const tabs: AdminDashboardTab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'create', label: 'Create' }
];

export default function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
