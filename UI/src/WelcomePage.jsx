import React, { useState } from 'react'
import Medicines from './Medicines'
import DoctorAppointment from './DoctorAppointment'
import MyDetails from './MyDetails'

const WelcomePage = () => {
  const [activeTab, setActiveTab] = useState('medicines') // State to track the active tab
  const [files, setFiles] = useState([]) // Lifted state for uploaded files

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Tabs */}
      <nav className="bg-gray-200 w-1/4 min-h-screen flex flex-col gap-4 py-4 px-2">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'medicines' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => setActiveTab('medicines')}
        >
          Medicines
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'appointment' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => setActiveTab('appointment')}
        >
          Doctor Appointment
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'details' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => setActiveTab('details')}
        >
          My Details
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-4">
        {activeTab === 'medicines' && (
          <Medicines files={files} setFiles={setFiles} />
        )}
        {activeTab === 'appointment' && <DoctorAppointment />}
        {activeTab === 'details' && <MyDetails />}
      </main>
    </div>
  )
}

export default WelcomePage