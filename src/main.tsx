import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/main.scss';

// Создаем клиент для React Query с настройками по умолчанию
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут кэширования (данные остаются свежими 5 минут)
      cacheTime: 15 * 60 * 1000, // 15 минут хранения в кэше (если запрос не используется, данные остаются в кэше)
    },
  },
});

// Рендерим приложение с провайдером React Query
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
