import { useState } from "react";
import API from "../../services/api";

export default function Ledger() {
  const [studentId, setStudentId] = useState("");
  const [ledger, setLedger] = useState([]);
  const [summary, setSummary] = useState(null);

  const handleFetch = async () => {
    try {
      const res = await API.get(`/ledger/${studentId}`);
      setLedger(res.data.data || []);
      setSummary(res.data.summary || null);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to load ledger");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Student Ledger</h1>

      <div className="bg-white shadow rounded-xl p-6 mb-6 flex gap-4">
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          className="border p-3 rounded-lg w-full"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          View Ledger
        </button>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold">Total Debit</h3>
            <p>₹ {summary.totalDebit}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold">Total Credit</h3>
            <p>₹ {summary.totalCredit}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold">Closing Balance</h3>
            <p>₹ {summary.closingBalance}</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Type</th>
              <th className="p-4">Debit</th>
              <th className="p-4">Credit</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((entry) => (
              <tr key={entry._id} className="border-t">
                <td className="p-4">
                  {new Date(entry.entryDate).toLocaleDateString()}
                </td>
                <td className="p-4">{entry.entryType}</td>
                <td className="p-4">₹ {entry.debit}</td>
                <td className="p-4">₹ {entry.credit}</td>
                <td className="p-4">₹ {entry.balance}</td>
                <td className="p-4">{entry.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}