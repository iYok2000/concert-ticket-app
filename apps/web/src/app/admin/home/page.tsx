'use client';

import { useState, useEffect } from 'react';
import AdminTabs from '@/components/admin/AdminTabs';
import ConcertsOverview from '@/components/admin/ConcertsOverview';
import CreateConcertForm from '@/components/admin/CreateConcertForm';
import { ConcertService } from '@/services/ConcertService';
import { Concert } from '@concert/shared';
import { type AdminDashboardTab, type CreateConcertForm as CreateConcertFormType } from '@/types/admin';
import { withRoleGuard } from '@/hoc/withRoleGuard';
import { ROLE_ARRAYS } from '@concert/shared';
import Link from 'next/link';

const toast = {
  success: (msg: string) => alert(`✅ ${msg}`),
  error: (msg: string) => alert(`❌ ${msg}`)
};

function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<AdminDashboardTab['id']>('overview');
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string>('');

  useEffect(() => {
    loadConcerts();
  }, []);

  const loadConcerts = async () => {
    setIsLoading(true);
    try {
      const data = await ConcertService.getAllConcerts();
      setConcerts(data);
    } catch (error) {
      toast.error('ไม่สามารถโหลดข้อมูลคอนเสิร์ตได้');
      console.error('Failed to load concerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateConcert = async (formData: CreateConcertFormType) => {
    setIsCreating(true);
    try {
      const concertData = {
        name: formData.name,
        description: formData.description,
        date: new Date(formData.date),
        venue: formData.venue,
        totalSeats: formData.totalSeats
      };
      
      const newConcert = await ConcertService.createConcert(concertData);
      setConcerts(prev => [newConcert, ...prev]);
      toast.success('สร้างคอนเสิร์ตสำเร็จ');
      setActiveTab('overview');
    } catch (error) {
      toast.error('ไม่สามารถสร้างคอนเสิร์ตได้');
      console.error('Failed to create concert:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteConcert = async (concertId: string) => {
    if (!confirm('คุณแน่ใจหรือว่าต้องการลบคอนเสิร์ตนี้?')) {
      return;
    }

    setDeletingId(concertId);
    try {
      // Note: Delete method not implemented in ConcertService yet
      toast.success('ลบคอนเสิร์ตสำเร็จ (mock)');
      setConcerts(prev => prev.filter(concert => concert.id !== concertId));
    } catch (error) {
      toast.error('ไม่สามารถลบคอนเสิร์ตได้');
      console.error('Failed to delete concert:', error);
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">จัดการคอนเสิร์ตและดูภาพรวมการจอง</p>
            </div>
            
            <div className="flex space-x-3">
              <Link
                href="/admin/history"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View History
              </Link>
              
              <button
                onClick={loadConcerts}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <svg className={`-ml-1 mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                รีเฟรช
              </button>
            </div>
          </div>
          
          <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <ConcertsOverview
            concerts={concerts}
            onDeleteConcert={handleDeleteConcert}
            isDeleting={deletingId}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'create' && (
          <CreateConcertForm
            onSubmit={handleCreateConcert}
            isLoading={isCreating}
          />
        )}
      </div>
    </div>
  );
}

export default withRoleGuard(AdminHomePage, ROLE_ARRAYS.ADMIN_ONLY);