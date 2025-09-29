"use client";

import { Concert, Reservation } from "@concert/shared";
import { ConcertService, ReservationService } from "@/services/ConcertService";
import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import { User } from "lucide-react";

interface ConcertCardProps {
  concert: Concert;
  showBookButton?: boolean;
  showCancelButton?: boolean;
  reservationId?: string;
  onUpdate?: () => void;
}

export const ConcertCard = ({
  concert,
  showBookButton = false,
  showCancelButton = false,
  reservationId,
  onUpdate,
}: ConcertCardProps) => {
  const { role } = useUser();
  const [loading, setLoading] = useState(false);
  const [userReservation, setUserReservation] = useState<Reservation | null>(
    null
  );
  const [checkingReservation, setCheckingReservation] = useState(true);

  const userId = "2";

  const isSoldOut = concert.availableSeats === 0;

  useEffect(() => {
    const checkUserReservation = async () => {
      if (!showBookButton) {
        setCheckingReservation(false);
        return;
      }

      try {
        const reservations = await ReservationService.getMyReservations(userId);
        const reservation = reservations.find(
          (r) => r.concertId === concert.id && r.status === "confirmed"
        );
        setUserReservation(reservation || null);
      } catch (error) {
        console.error("Error checking reservation:", error);
      } finally {
        setCheckingReservation(false);
      }
    };

    checkUserReservation();
  }, [concert.id, userId, showBookButton]);

  const handleBookTicket = async () => {
    try {
      setLoading(true);
      await ReservationService.createReservation({
        userId,
        concertId: concert.id,
      });
      alert("Ticket booked successfully!");

      const reservations = await ReservationService.getMyReservations(userId);
      const reservation = reservations.find(
        (r) => r.concertId === concert.id && r.status === "confirmed"
      );
      setUserReservation(reservation || null);

      onUpdate?.();
    } catch (error: any) {
      alert(error.message || "Failed to book ticket");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async () => {
    const reservationToCancel = reservationId || userReservation?.id;
    if (!reservationToCancel) return;

    if (!confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    try {
      setLoading(true);
      await ReservationService.cancelReservation(reservationToCancel);
      alert("Reservation cancelled successfully!");

      setUserReservation(null);

      onUpdate?.();
    } catch (error: any) {
      alert(error.message || "Failed to cancel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-[#1692EC]">{concert.name}</h3>
        {isSoldOut && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            SOLD OUT
          </span>
        )}
      </div>
      <div className=" border-b-1 border-[#C2C2C2] mb-4"></div>
      <p className="text-gray-600 mb-4">{concert.description}</p>

      {/* <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Total Seats:</span>
          <span className="text-sm font-medium">{concert.totalSeats}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Reserved:</span>
          <span className="text-sm font-medium">{concert.reservedSeats}</span>
        </div>
      </div> */}

      {/* <div className="text-xs text-gray-400 mb-4">
        Created: {new Date(concert.createdAt).toLocaleDateString()}
      </div> */}

      {showBookButton && role === "user" && (
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex justify-between">
            <User></User>
            <span className="text-sm font-medium">
              {concert.availableSeats}
            </span>
          </div>
          {checkingReservation ? (
            <button
              disabled
              className="w-full py-2 px-4 rounded font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              Checking
            </button>
          ) : userReservation ? (
            <button
              onClick={handleCancelReservation}
              disabled={loading}
              className={`w-40 py-2 px-4 rounded font-medium transition-colors ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#F96464] text-white hover:bg-red-700"
              }`}
            >
              {loading ? "Cancelling..." : "Cancel"}
            </button>
          ) : (
            <button
              onClick={handleBookTicket}
              disabled={isSoldOut || loading}
              className={`w-40 py-2 px-4 rounded font-medium transition-colors ${
                isSoldOut || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#1692EC] text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Booking..." : isSoldOut ? "Sold Out" : "Reserve"}
            </button>
          )}
        </div>
      )}

      {showCancelButton && role === "user" && (
        <button
          onClick={handleCancelReservation}
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-medium transition-colors ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#F96464] text-white hover:bg-red-700"
          }`}
        >
          {loading ? "Cancelling..." : "Cancel"}
        </button>
      )}
    </div>
  );
};
