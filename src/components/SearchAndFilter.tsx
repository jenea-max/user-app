import { useState, useEffect } from 'react';

// Интерфейс для пропсов компонента
interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filterCity: string) => void;
  cities: string[];
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const SearchAndFilter = ({ onSearch, onFilter, cities }: SearchAndFilterProps) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const debouncedSearch = useDebounce(search, 500);  // Применяем дебаунсинг

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
  };

  // Отправляем значение поиска после дебаунсинга
  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearchChange}
      />
      <select value={filter} onChange={handleFilterChange}>
        <option value="">All Cities</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};
