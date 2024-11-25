export const MAKES = [
  'Acura', 'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 
  'Lexus', 'Mercedes-Benz', 'Tesla', 'Toyota', 'Volkswagen'
];

export const BODY_TYPES = [
  'Sedan', 'SUV', 'Truck', 'Coupe', 'Van', 'Wagon', 'Convertible'
];

export const FUEL_TYPES = [
  'Gasoline', 'Electric', 'Hybrid', 'Diesel', 'Plug-in Hybrid'
];

export const TRANSMISSION_TYPES = [
  'Automatic', 'Manual', 'CVT', 'Semi-Automatic'
];

export const YEARS = Array.from(
  { length: 30 }, 
  (_, i) => new Date().getFullYear() - i
);

export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'year-desc', label: 'Year: Newest First' },
  { value: 'year-asc', label: 'Year: Oldest First' },
  { value: 'mileage-asc', label: 'Mileage: Low to High' },
  { value: 'mileage-desc', label: 'Mileage: High to Low' },
  { value: 'distance', label: 'Distance: Nearest First' }
];