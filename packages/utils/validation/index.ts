// Email Validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'อีเมลต้องไม่ว่าง';
  }
  if (!isValidEmail(email)) {
    return 'รูปแบบอีเมลไม่ถูกต้อง';
  }
  return null;
};

// Name Validation
export const validateName = (name: string): string | null => {
  if (!name) {
    return 'ชื่อต้องไม่ว่าง';
  }
  if (name.length < 2) {
    return 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร';
  }
  if (name.length > 100) {
    return 'ชื่อต้องไม่เกิน 100 ตัวอักษร';
  }
  return null;
};

// Concert Validation
export const validateConcertName = (name: string): string | null => {
  if (!name) {
    return 'ชื่อคอนเสิร์ตต้องไม่ว่าง';
  }
  if (name.length < 3) {
    return 'ชื่อคอนเสิร์ตต้องมีอย่างน้อย 3 ตัวอักษร';
  }
  if (name.length > 200) {
    return 'ชื่อคอนเสิร์ตต้องไม่เกิน 200 ตัวอักษร';
  }
  return null;
};

export const validateConcertDescription = (description: string): string | null => {
  if (!description) {
    return 'คำอธิบายต้องไม่ว่าง';
  }
  if (description.length < 10) {
    return 'คำอธิบายต้องมีอย่างน้อย 10 ตัวอักษร';
  }
  if (description.length > 1000) {
    return 'คำอธิบายต้องไม่เกิน 1000 ตัวอักษร';
  }
  return null;
};

export const validateConcertDate = (date: string | Date): string | null => {
  if (!date) {
    return 'วันที่จัดคอนเสิร์ตต้องไม่ว่าง';
  }
  
  const concertDate = new Date(date);
  const now = new Date();
  
  if (isNaN(concertDate.getTime())) {
    return 'รูปแบบวันที่ไม่ถูกต้อง';
  }
  
  if (concertDate <= now) {
    return 'วันที่จัดคอนเสิร์ตต้องเป็นวันในอนาคต';
  }
  
  return null;
};

export const validateVenue = (venue: string): string | null => {
  if (!venue) {
    return 'สถานที่จัดคอนเสิร์ตต้องไม่ว่าง';
  }
  if (venue.length < 3) {
    return 'สถานที่จัดคอนเสิร์ตต้องมีอย่างน้อย 3 ตัวอักษร';
  }
  if (venue.length > 200) {
    return 'สถานที่จัดคอนเสิร์ตต้องไม่เกิน 200 ตัวอักษร';
  }
  return null;
};

export const validateTotalSeats = (totalSeats: number | string): string | null => {
  const seats = typeof totalSeats === 'string' ? parseInt(totalSeats) : totalSeats;
  
  if (isNaN(seats)) {
    return 'จำนวนที่นั่งต้องเป็นตัวเลข';
  }
  if (seats <= 0) {
    return 'จำนวนที่นั่งต้องมากกว่า 0';
  }
  if (seats > 100000) {
    return 'จำนวนที่นั่งต้องไม่เกิน 100,000';
  }
  return null;
};

// Form Validation Helper
export const validateForm = <T extends Record<string, any>>(
  data: T,
  validators: Partial<Record<keyof T, (value: any) => string | null>>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const errors: Partial<Record<keyof T, string>> = {};
  
  for (const [field, validator] of Object.entries(validators)) {
    if (validator && typeof validator === 'function') {
      const error = validator(data[field as keyof T]);
      if (error) {
        errors[field as keyof T] = error;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Required Field Validation
export const validateRequired = (fieldName: string) => (value: any): string | null => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName}ต้องไม่ว่าง`;
  }
  return null;
};