import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from './components/LoadingSpinner';
import './styles/main.scss';

// Ленивая загрузка компонентов
const UserListPage = lazy(() => import('./pages/UserListPage'));
const UserDetailsPage = lazy(() => import('./pages/UserDetailsPage'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Главная страница с списком пользователей */}
          <Route path="/" element={<UserListPage />} />
          {/* Страница с деталями пользователя */}
          <Route path="/users/:userId" element={<UserDetailsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
