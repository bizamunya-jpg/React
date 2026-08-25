import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import './App.css';
import Dashboard from './pages/Dashboard';

// Lazy load page components (Code Splitting)
const Movies = lazy(() => import('./pages/Dashboard'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TvSeriesPage = lazy(() => import('./pages/TvSeriesPage'));
const CartoonsPage = lazy(() => import('./pages/CartoonsPage'));
const AnimePage = lazy(() => import('./pages/AnimePage'));
const Navigation = lazy(() => import('./components/Navigation'));

// Loading component
function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status" aria-label="Loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// 404 Component
function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go back to Home</a>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <MovieProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<Dashboard />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tv-series" element={<TvSeriesPage />} />
              <Route path="/cartoons" element={<CartoonsPage />} />
              <Route path="/anime" element={<AnimePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </MovieProvider>
    </ErrorBoundary>
  );
}

export default App;