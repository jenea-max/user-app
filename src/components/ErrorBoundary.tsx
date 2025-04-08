import { Component, ErrorInfo, ReactNode } from 'react';

// Интерфейсы для пропсов и состояния компонента
interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  // Статичный метод для получения состояния на основе ошибки
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // Логирование ошибки
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Можно добавить отправку ошибок на сервер для дальнейшего анализа
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;  // Показать запасной интерфейс
    }

    return this.props.children;
  }
}