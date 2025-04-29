import React from 'react'

const MyDetails = () => {
  const userDetails = {
    name: 'Nilanshu',
    email: 'nilanshu@example.com',
    phone: '123-456-7890',
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Details</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Field</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userDetails).map(([key, value]) => (
            <tr
              key={key}
              className="hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              <td className="border border-gray-300 px-4 py-2 text-left capitalize">
                {key}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add a full-width GIF below the table */}
      <div className="mt-6">
        <img
          src=""
          alt="Doctors and Patients"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  )
}

export default MyDetails