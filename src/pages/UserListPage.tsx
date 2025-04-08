import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { User } from '../types/user';
import { SearchAndFilter } from '../components/SearchAndFilter';

const UserListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const navigate = useNavigate();

  // Запрос данных всех пользователей
  const { data: users, isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiClient.get('/users');
      return response.data;
    },
  });

  // Получаем уникальные города для фильтра
  const cities = useMemo(() => {
    if (!users) return [];
    return [...new Set(users.map(user => user.address.city))];
  }, [users]);

  // Фильтрация пользователей по имени, email и городу
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = 
        filterCity === '' || 
        user.address.city.toLowerCase() === filterCity.toLowerCase();
      return matchesSearch && matchesCity;
    });
  }, [users, searchTerm, filterCity]);

  // Обработка состояний загрузки и ошибок
  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error fetching users</div>;

  return (
    <div className="user-list-page">
      <h1>User List</h1>

      <SearchAndFilter 
        onSearch={setSearchTerm}
        onFilter={setFilterCity}
        cities={cities}
      />

      <div className="user-grid">
        {filteredUsers.map(user => (
          <div 
            key={user.id} 
            className="user-card"
            onClick={() => navigate(`/users/${user.id}`)} // Навигация к деталям пользователя
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
