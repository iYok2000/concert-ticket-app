"use client";

import { useState, useEffect } from 'react';
import { ReservationService } from '@/services/ConcertService';
import { Reservation } from '@concert/shared';
import { withRoleGuard } from "@/hoc/withRoleGuard";
import { ROLE_ARRAYS } from "@concert/shared";
import Link from 'next/link';
import ReservationHistoryTable from '@/components/admin/ReservationHistoryTable';

function AdminHistoryPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllReservations();
  }, []);

  const loadAllReservations = async () => {
    setLoading(true);
    try {
      const data = await ReservationService.getAllReservations();
      setReservations(data);
    } catch (error) {
      console.error('Failed to load reservations:', error);
      alert('ไม่สามารถโหลดข้อมูลการจองได้');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading reservations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/home"
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Reservation History
                </h1>
                <p className="mt-1 text-sm text-gray-500">ประวัติการจองของผู้ใช้ทั้งหมด</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Total: {reservations.length} reservations
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ReservationHistoryTable 
            reservations={reservations}
            onRefresh={loadAllReservations}
          />
        </div>
      </div>
    </div>
  );
}

export default withRoleGuard(AdminHistoryPage, ROLE_ARRAYS.ADMIN_ONLY);