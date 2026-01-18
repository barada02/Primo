import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import CreateTaskModal from './components/tasks/CreateTaskModal'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreate={() => setIsModalOpen(true)}
      />

      <main style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {/* Placeholders for other tabs */}
        {activeTab === 'habits' && <div className="p-10">Habits View (Coming Soon)</div>}
      </main>

      {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default App
