"use client";

import { Reservation, Concert } from "@concert/shared";
import { useState, useEffect } from "react";
import { ReservationService, ConcertService } from "@/services/ConcertService";
import { ConcertCard } from "./ConcertCard";

interface ReservationWithConcert extends Reservation {
  concert?: Concert;
}

export const ReservationHistory = () => {
  const [reservations, setReservations] = useState<ReservationWithConcert[]>([]);
  const [loading, setLoading] = useState(true);

  // Use actual user ID from the system - ID "2" is the regular user
  const userId = "2";

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const reservationData = await ReservationService.getMyReservations(userId);
      
      // Fetch concert details for each reservation
      const reservationsWithConcerts = await Promise.all(
        reservationData.map(async (reservation) => {
          try {
            const concert = await ConcertService.getConcertById(reservation.concertId);
            return { ...reservation, concert };
          } catch (error) {
            console.error(`Failed to fetch concert ${reservation.concertId}:`, error);
            return reservation;
          }
        })
      );

      setReservations(reservationsWithConcerts);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleReservationUpdate = () => {
    fetchReservations();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading your reservations...</div>
      </div>
    );
  }

  const activeReservations = reservations.filter(r => r.status === 'confirmed');
  const cancelledReservations = reservations.filter(r => r.status === 'cancelled');

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600 mb-4">No reservations found</h3>
        <p className="text-gray-500">Book your first concert ticket to see it here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Active Reservations */}
      {activeReservations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Reservations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeReservations.map((reservation) => {
              if (!reservation.concert) {
                return (
                  <div key={reservation.id} className="border border-gray-200 rounded-lg p-6">
                    <p className="text-gray-500">Concert information unavailable</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Booked: {new Date(reservation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                );
              }

              return (
                <div key={reservation.id} className="relative">
                  <ConcertCard
                    concert={reservation.concert}
                    showCancelButton={true}
                    reservationId={reservation.id}
                    onUpdate={handleReservationUpdate}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      BOOKED
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled Reservations */}
      {cancelledReservations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-600 mb-6">Cancelled Reservations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cancelledReservations.map((reservation) => {
              if (!reservation.concert) {
                return (
                  <div key={reservation.id} className="border border-gray-200 rounded-lg p-6 opacity-60">
                    <p className="text-gray-500">Concert information unavailable</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Cancelled: {new Date(reservation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                );
              }

              return (
                <div key={reservation.id} className="relative opacity-60">
                  <ConcertCard concert={reservation.concert} />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      CANCELLED
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
