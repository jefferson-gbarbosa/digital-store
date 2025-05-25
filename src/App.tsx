import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductViewPage from './pages/ProductViewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/produtos" element={<Layout><ProductListingPage /></Layout>} />
        <Route path="/produto/:id" element={<Layout><ProductViewPage /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
