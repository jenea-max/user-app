import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { apiClient } from '../api/client';
import { User } from '../types/user';

const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data: user, isLoading, isError } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    },
    enabled: !!userId, // чтобы запрос не ушёл с undefined
  });

  if (isLoading) return <div>Loading user details...</div>;
  if (isError) return <div>Error fetching user details</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-details">
      <h1>{user.name}</h1>
      <div className="details-grid">
        <div>
          <h3>Contact Information</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
        </div>
        <div>
          <h3>Address</h3>
          <p>
            {user.address.street}, {user.address.suite}<br />
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
        <div>
          <h3>Company</h3>
          <p>{user.company.name}</p>
          <p>{user.company.catchPhrase}</p>
          <p>{user.company.bs}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
