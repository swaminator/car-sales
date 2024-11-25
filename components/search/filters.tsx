// Previous imports remain the same...

export function Filters({ onFilterChange }: FiltersProps) {
  const searchParams = useSearchParams();
  
  // Initialize filters from URL parameters
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    model: searchParams.get('model') || '',
    minYear: searchParams.get('minYear') || '',
    maxYear: searchParams.get('maxYear') || '',
    priceRange: [
      parseInt(searchParams.get('minPrice') || '0'),
      parseInt(searchParams.get('maxPrice') || '150000')
    ],
    mileageRange: [
      parseInt(searchParams.get('minMileage') || '0'),
      parseInt(searchParams.get('maxMileage') || '200000')
    ],
    bodyType: searchParams.get('bodyType') || '',
    fuelType: searchParams.get('fuelType') || '',
    location: searchParams.get('location') || '',
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      make: '',
      model: '',
      minYear: '',
      maxYear: '',
      priceRange: [0, 150000],
      mileageRange: [0, 200000],
      bodyType: '',
      fuelType: '',
      location: '',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  // Rest of the component remains the same...
}