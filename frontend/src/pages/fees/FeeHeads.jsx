import { useEffect, useState } from "react";
import API from "../../services/api";

export default function FeeHeads() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    amount: "",
    description: ""
  });

  const [feeHeads, setFeeHeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeeHeads = async () => {
    try {
      const res = await API.get("/fee-heads");
      setFeeHeads(res.data.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load fee heads");
    }
  };

  useEffect(() => {
    fetchFeeHeads();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/fee-heads", {
        ...form,
        amount: Number(form.amount)
      });

      setForm({
        name: "",
        code: "",
        amount: "",
        description: ""
      });

      fetchFeeHeads();
      alert("Fee head created");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create fee head");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Fee Heads</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Fee Head Name"
          className="border p-3 rounded-lg"
          required
        />
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Code"
          className="border p-3 rounded-lg"
          required
        />
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
          placeholder="Amount"
          className="border p-3 rounded-lg"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-lg col-span-1 md:col-span-2"
        >
          {loading ? "Saving..." : "Create Fee Head"}
        </button>
      </form>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Code</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {feeHeads.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.code}</td>
                <td className="p-4">₹ {item.amount}</td>
                <td className="p-4">{item.isActive ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}