"use client";

import { useState, useEffect } from 'react';
import { Reservation, Concert, User } from '@concert/shared';
import { ConcertService } from '@/services/ConcertService';

interface ReservationWithDetails extends Reservation {
  concert?: Concert;
  user?: User;
}

interface ReservationHistoryTableProps {
  reservations: Reservation[];
  onRefresh: () => void;
}

export default function ReservationHistoryTable({ 
  reservations, 
  onRefresh 
}: ReservationHistoryTableProps) {
  const [enrichedReservations, setEnrichedReservations] = useState<ReservationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrichReservationsData();
  }, [reservations]);

  const enrichReservationsData = async () => {
    setLoading(true);
    try {
      // Get all concerts and users data
      const concerts = await ConcertService.getAllConcerts();
      
      // Mock users data (in real app would fetch from API)
      const users = [
        { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' as const, createdAt: new Date(), updatedAt: new Date() },
        { id: '2', name: 'Regular User', email: 'user@example.com', role: 'user' as const, createdAt: new Date(), updatedAt: new Date() }
      ];

      const enriched = reservations.map(reservation => ({
        ...reservation,
        concert: concerts.find(c => c.id === reservation.concertId),
        user: users.find(u => u.id === reservation.userId)
      }));

      setEnrichedReservations(enriched);
    } catch (error) {
      console.error('Error enriching reservation data:', error);
      setEnrichedReservations(reservations);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDateTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-lg">Loading reservation details...</div>
      </div>
    );
  }

  if (enrichedReservations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600 mb-4">No reservations found</h3>
        <button
          onClick={onRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Concert
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {enrichedReservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDateTime(reservation.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">
                    {reservation.user?.name || 'Unknown User'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {reservation.user?.email || `ID: ${reservation.userId}`}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">
                    {reservation.concert?.name || 'Unknown Concert'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {reservation.concert?.venue}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={getStatusBadge(reservation.status)}>
                  {reservation.status === 'confirmed' ? 'จองอยู่' : 'ยกเลิกแล้ว'}
                </span>
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {reservation.updatedAt ? formatDateTime(reservation.updatedAt) : '-'}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={onRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}
