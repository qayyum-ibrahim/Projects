import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Websites from './pages/Websites.jsx'
import Animations from './pages/Animations.jsx'
import NotFound from './pages/NotFound.jsx'
import Header from './components/Header.jsx'
import FilterBar from './components/FilterBar.jsx'

export default function App() {
  return (
    <>
      <Header />
      <FilterBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/animations" element={<Animations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
