// A very simple faker implementation for generating sample data
export const faker = {
  randomUUID(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  },
  
  generateBookingReference(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
  
  generateName(): string {
    const firstNames = [
      'Aarav', 'Aryan', 'Aditi', 'Ananya', 'Divya', 
      'Kabir', 'Kavya', 'Neha', 'Rahul', 'Riya',
      'Sanjay', 'Shreya', 'Vikram', 'Zara', 'Priya'
    ];
    
    const lastNames = [
      'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta',
      'Joshi', 'Agarwal', 'Reddy', 'Mehta', 'Verma',
      'Malhotra', 'Rao', 'Kapoor', 'Shah', 'Nair'
    ];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`;
  },
  
  randomArrayItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
};