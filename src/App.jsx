import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import CityPage from './pages/CityPage.jsx';
import TimelinePage from './pages/TimelinePage.jsx';
import ComparePage from './pages/ComparePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cities/:cityId" element={<CityPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="compare" element={<ComparePage />} />
      </Route>
    </Routes>
  );
}
