import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import './App.css';

// Lazy load page components (Code Splitting)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TvSeriesPage = lazy(() => import('./pages/TvSeriesPage'));
const CartoonsPage = lazy(() => import('./pages/CartoonsPage'));
const AnimePage = lazy(() => import('./pages/AnimePage'));
const Navigation = lazy(() => import('./components/Navigation'));

// Loading component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
    <MovieProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tv-series" element={<TvSeriesPage />} />
            <Route path="/cartoons" element={<CartoonsPage />} />
            <Route path="/anime" element={<AnimePage />} />
          </Routes>
        </Suspense>
      </Router>
    </MovieProvider>
  );
}

export default App;
