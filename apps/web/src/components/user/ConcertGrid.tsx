"use client";

import { Concert } from "@concert/shared";
import { useState, useEffect } from "react";
import { ConcertService } from "@/services/ConcertService";
import { ConcertCard } from "./ConcertCard";

export const ConcertGrid = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const data = await ConcertService.getAllConcerts();
        setConcerts(data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading concerts</div>
      </div>
    );
  }

  if (concerts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600 mb-4">No concerts available</h3>
        <p className="text-gray-500">Check back later for new shows!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {concerts.map((concert) => (
        <ConcertCard 
          key={concert.id} 
          concert={concert} 
          showBookButton={true}
          onUpdate={() => {
            // Refresh the concerts list after booking
            ConcertService.getAllConcerts().then(setConcerts);
          }}
        />
      ))}
    </div>
  );
};
