import React from 'react'

const Medicines = ({ files, setFiles }) => {
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      uploadedAt: new Date().toLocaleString(),
      status: 'new', // Initial status
    }))
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles])
  }

  const handleSubmit = () => {
    files.forEach((file, index) => {
      // Update status to "in progress" after 30 seconds
      setTimeout(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f, i) =>
            i === index ? { ...f, status: 'in progress' } : f
          )
        )
      }, 30000)

      // Update status to "success" after 60 seconds
      setTimeout(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f, i) =>
            i === index ? { ...f, status: 'success' } : f
          )
        )
      }, 60000)
    })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Medicines</h2>
      <p className="mb-4">Upload your prescriptions here:</p>

      {/* File Input */}
      <div className="flex items-center gap-4 mb-4">
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
        >
          Choose Files
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>

      {/* File Table */}
      {files.length > 0 && (
        <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                File Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Uploaded At
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {file.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {file.uploadedAt}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 text-left font-semibold ${
                    file.status === 'new'
                      ? 'text-red-500'
                      : file.status === 'in progress'
                      ? 'text-blue-500'
                      : 'text-green-500'
                  }`}
                >
                  {file.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Medicines