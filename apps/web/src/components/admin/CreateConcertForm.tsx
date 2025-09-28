import { useState } from 'react';
import { type CreateConcertForm, type CreateConcertFormProps, type CreateConcertFormErrors } from '@/types/admin';

export default function CreateConcertForm({ 
  onSubmit, 
  isLoading = false 
}: CreateConcertFormProps) {
  const [formData, setFormData] = useState<CreateConcertForm>({
    name: '',
    description: '',
    date: '',
    venue: '',
    totalSeats: 0
  });

  const [errors, setErrors] = useState<CreateConcertFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalSeats' ? parseInt(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CreateConcertFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: CreateConcertFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'กรุณาใส่ชื่อคอนเสิร์ต';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'กรุณาใส่คำอธิบาย';
    }

    if (!formData.date) {
      newErrors.date = 'กรุณาเลือกวันที่และเวลา';
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'กรุณาใส่สถานที่';
    }

    if (formData.totalSeats <= 0) {
      newErrors.totalSeats = 'กรุณาใส่จำนวนที่นั่งที่ถูกต้อง';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form on success
      setFormData({
        name: '',
        description: '',
        date: '',
        venue: '',
        totalSeats: 0
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          สร้างคอนเสิร์ตใหม่
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Concert Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อคอนเสิร์ต *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="เช่น Rock Concert 2024"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              คำอธิบาย *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="อธิบายรายละเอียดของคอนเสิร์ต..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Date and Time */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              วันที่และเวลา *
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          {/* Venue */}
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
              สถานที่ *
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.venue ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="เช่น Impact Arena, Bangkok"
            />
            {errors.venue && <p className="mt-1 text-sm text-red-600">{errors.venue}</p>}
          </div>

          {/* Total Seats */}
          <div>
            <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 mb-2">
              จำนวนที่นั่งทั้งหมด *
            </label>
            <input
              type="number"
              id="totalSeats"
              name="totalSeats"
              value={formData.totalSeats || ''}
              onChange={handleChange}
              min="1"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.totalSeats ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="เช่น 1000"
            />
            {errors.totalSeats && <p className="mt-1 text-sm text-red-600">{errors.totalSeats}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  กำลังสร้าง...
                </div>
              ) : (
                'สร้างคอนเสิร์ต'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
