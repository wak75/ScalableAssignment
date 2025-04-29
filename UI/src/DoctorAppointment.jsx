import React, { useState } from 'react'

const DoctorAppointment = () => {
  const [search, setSearch] = useState('')
  const hospitals = [
    { id: 1, name: 'City Hospital', doctor: 'Dr. Smith' },
    { id: 2, name: 'Green Valley Clinic', doctor: 'Dr. Johnson' },
    { id: 3, name: 'Sunrise Medical Center', doctor: 'Dr. Lee' },
  ]

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Doctor Appointment</h2>
      <input
        type="text"
        placeholder="Search by hospital name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 gap-4">
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="p-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-lg font-semibold">{hospital.name}</h3>
            <p>Consult with: {hospital.doctor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointment