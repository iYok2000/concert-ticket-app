import { Award, CircleX } from 'lucide-react';
import ConcertCard from './ConcertCard';
import { Concert } from '@concert/shared';

interface ConcertsOverviewProps {
  concerts: Concert[];
  onDeleteConcert: (id: string) => void;
  isDeleting?: string; // ID of concert being deleted
  isLoading?: boolean;
}

export default function ConcertsOverview({ 
  concerts, 
  onDeleteConcert, 
  isDeleting,
  isLoading = false 
}: ConcertsOverviewProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-gray-600">กำลังโหลดข้อมูล...</span>
      </div>
    );
  }

  if (concerts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm12-3c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zM9 10l12-3" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          ยังไม่มีคอนเสิร์ต
        </h3>
        <p className="text-gray-500 mb-4">
          คุณยังไม่ได้สร้างคอนเสิร์ตใด ๆ เริ่มต้นสร้างคอนเสิร์ตแรกของคุณ
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm12-3c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">คอนเสิร์ททั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{concerts.length}</p>
            </div>
          </div>
        </div> */}

        <div className="bg-[#0070A4] rounded-lg shadow p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white">Total of seats</p>
              <p className="text-2xl font-bold text-white">
                {Array.isArray(concerts) ? concerts.reduce((sum, concert) => sum + concert.totalSeats, 0).toLocaleString() : '0'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#00A58B] rounded-lg shadow p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <Award></Award>
                {/* <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> */}
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white">Reserve</p>
              <p className="text-2xl font-bold text-white">
                {Array.isArray(concerts) ? concerts.reduce((sum, concert) => sum + concert.reservedSeats, 0).toLocaleString() : '0'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#F96464] rounded-lg shadow p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <CircleX className="w-5 h-5 text-red-600" />
                {/* <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg> */}
              </div>
            </div>
            <div className="ml-4 ">
              <p className="text-sm font-medium text-white">Cancel</p>
              <p className="text-2xl font-bold text-white">
                {Array.isArray(concerts) ? concerts.filter(concert => concert.availableSeats === 0).length : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Concerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6">
        {Array.isArray(concerts) ? concerts.map((concert) => (
          <ConcertCard
            key={concert.id}
            concert={concert}
            onDelete={onDeleteConcert}
            isDeleting={isDeleting === concert.id}
          />
        )) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">ไม่พบข้อมูลคอนเสิร์ต</p>
          </div>
        )}
      </div>
    </div>
  );
}
