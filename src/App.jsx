import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import HabitsPage from './components/habits/HabitsPage'
import GoalsPage from './components/goals/GoalsPage'
import AnalyticsPage from './components/analytics/AnalyticsPage'
import CreateTaskModal from './components/tasks/CreateTaskModal'
import LandingPage from './components/landing/LandingPage'
import './index.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <LandingPage
        onLogin={() => setIsAuthenticated(true)}
        onVisitorAccess={() => setIsAuthenticated(true)}
      />
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreate={() => setIsModalOpen(true)}
      />

      <main style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'habits' && <HabitsPage />}
        {activeTab === 'goals' && <GoalsPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {/* Placeholders for other tabs */}
      </main>

      {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default App
