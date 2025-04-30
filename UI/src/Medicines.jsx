import { useEffect, useState } from 'react'
import axios from 'axios'
import { FileCard } from './components/custom/FileCard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Initialize toast notifications
// toast.configure()

const Medicines = ({ files, setFiles }) => {
    const [medicineName, setMedicineNames] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
  
    const handlePlaceOrder = () => {
      setIsDialogOpen(true)
    }
  
    const handleProceedToPay = () => {
        if (!address || !mobile) {
          toast.error('Please fill in all the details!', {
            position: "top-center", // Use string instead of toast.POSITION.TOP_CENTER
          })
          return
        }
        setIsDialogOpen(false)
        toast.success('Order Placed Successfully!', {
          position: "top-center", // Use string instead of toast.POSITION.TOP_CENTER
        })
      }
  // Load files from localStorage when the component mounts
  useEffect(() => {
    const storedFiles = localStorage.getItem('uploadedFiles')
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles))
    }
  }, [setFiles])

  // Save files to localStorage whenever files state changes
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem('uploadedFiles', JSON.stringify(files))
    }
  }, [files])

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      uploadedAt: new Date().toLocaleString(),
      status: 'new', // Initial status
    }))
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles])
    setMedicineNames([])
  }

  const handleSubmit = async () => {
    try{
        const response = await axios.get('http://localhost:8080/api/getMedicineDetails')
        setMedicineNames(response?.data ?? [])
        setFiles((prevFiles) => prevFiles.map((file) => ({
            ...file,
          status: 'success'
        })));
    }catch(error){
      console.error("Error uploading files:", error)
    }

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

      {medicineName?.length ? medicineName.map((medicine, index) => <FileCard key={index} title={medicine} />) : <></>}

      {/* Place Order Button */}
        {medicineName?.length > 0 && (
        <div className="mt-4 flex justify-end">
            <button
            onClick={handlePlaceOrder}
            className="px-3 py-1 bg-sky-300 text-white rounded hover:bg-sky-400 transition"
            >
            Place Order
            </button>
        </div>
        )}
        <div className="mb-6"></div> {/* Add gap before the table */}

      {/* Dialog for Address and Mobile Number */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToPay}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}

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