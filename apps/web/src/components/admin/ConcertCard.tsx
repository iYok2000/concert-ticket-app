import { Concert } from '@concert/shared';

interface ConcertCardProps {
  concert: Concert;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function ConcertCard({ 
  concert, 
  onDelete, 
  isDeleting = false 
}: ConcertCardProps) {
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isSoldOut = concert.availableSeats === 0;

  const getStatusColor = () => {
    if (isSoldOut) return 'bg-red-100 text-red-800';
    if (concert.availableSeats < concert.totalSeats * 0.2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = () => {
    if (isSoldOut) return 'เต็มแล้ว';
    if (concert.availableSeats < concert.totalSeats * 0.2) return 'เหลือน้อย';
    return 'ยังมีที่';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {concert.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        {/* Delete Button */}
        <button
          onClick={() => onDelete(concert.id)}
          disabled={isDeleting}
          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="ลบคอนเสิร์ต"
        >
          {isDeleting ? (
            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">
        {concert.description}
      </p>

      {/* Details */}
      <div className="space-y-3">
        {/* Date & Venue */}
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(concert.date)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{concert.venue}</span>
        </div>

        {/* Seats Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm">
            <span className="text-gray-500">ที่นั่งทั้งหมด: </span>
            <span className="font-semibold text-gray-900">{concert.totalSeats}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">จองแล้ว: </span>
            <span className="font-semibold text-blue-600">{concert.reservedSeats}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">เหลือ: </span>
            <span className="font-semibold text-green-600">{concert.availableSeats}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(concert.reservedSeats / concert.totalSeats) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
