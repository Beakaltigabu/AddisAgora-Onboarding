import { Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'

function App() {
  return (
    <div className="min-h-screen bg-neutral-200">
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </div>
  )
}

export default App
