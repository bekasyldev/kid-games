import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Authors from './pages/Authors';
import About from './pages/About';
import Tasks from './pages/Tasks';
import Games from './pages/Games';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="authors" element={<Authors />} />
          <Route path="about" element={<About />} />
          <Route path="games" element={<Games/>} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
