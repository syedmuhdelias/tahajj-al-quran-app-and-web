import { Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen.jsx';
import Bab1MenuScreen from './pages/Bab1MenuScreen.jsx';
import Bab1SectionScreen from './pages/Bab1SectionScreen.jsx';
import Bab1InteractiveScreen from './pages/Bab1InteractiveScreen.jsx';
import PdfScreen from './pages/PdfScreen.jsx';

/**
 * CONVERSION: MaterialApp + routes from Navigator.push destinations.
 * Bab1InteractiveScreen was not wired in Flutter main.dart; route kept for full file parity.
 */
export default function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/bab1" element={<Bab1MenuScreen />} />
        <Route path="/bab1/section/:sectionType" element={<Bab1SectionScreen />} />
        <Route path="/bab1/interactive" element={<Bab1InteractiveScreen />} />
        <Route path="/pdf" element={<PdfScreen />} />
      </Routes>
    </div>
  );
}
