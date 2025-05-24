import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/produtos" element={<Layout><ProductListingPage /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
