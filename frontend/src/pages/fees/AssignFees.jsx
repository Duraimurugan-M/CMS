import { useEffect, useState } from "react";
import API from "../../services/api";

const emptyItem = {
  feeHeadId: "",
  title: "",
  amount: "",
  dueDate: "",
  installmentNo: 1,
  fineAmount: 0,
};

export default function AssignFees() {
  const [feeHeads, setFeeHeads] = useState([]);
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [remarks, setRemarks] = useState("");

  const [items, setItems] = useState([{ ...emptyItem }]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchFeeHeads = async () => {
    const res = await API.get("/fee-heads");
    return res?.data?.data || [];
  };

  const fetchStudents = async () => {
    const res = await API.get("/students");

    return (
      res?.data?.data ||
      res?.data?.students ||
      res?.data?.result ||
      []
    );
  };

  const loadInitialData = async () => {
    try {
      setLoading(true);

      const [feeHeadData, studentData] = await Promise.all([
        fetchFeeHeads(),
        fetchStudents(),
      ]);

      setFeeHeads(feeHeadData);
      setStudents(studentData);
    } catch (error) {
      console.error("Initial data load error:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to load students or fee heads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "feeHeadId") {
      const selectedFeeHead = feeHeads.find((head) => head._id === value);

      if (selectedFeeHead) {
        updatedItems[index].title = selectedFeeHead.name || "";
        updatedItems[index].amount = selectedFeeHead.amount || "";
      }
    }

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { ...emptyItem }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const resetForm = () => {
    setStudentId("");
    setAcademicYear("");
    setRemarks("");
    setItems([{ ...emptyItem }]);
  };

  const validateForm = () => {
    if (!studentId) {
      alert("Please select a student");
      return false;
    }

    if (!academicYear.trim()) {
      alert("Please enter academic year");
      return false;
    }

    if (items.length === 0) {
      alert("Add at least one fee item");
      return false;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.feeHeadId) {
        alert(`Please select fee head for item ${i + 1}`);
        return false;
      }

      if (!item.title.trim()) {
        alert(`Please enter title for item ${i + 1}`);
        return false;
      }

      if (!item.amount || Number(item.amount) <= 0) {
        alert(`Please enter valid amount for item ${i + 1}`);
        return false;
      }

      if (!item.dueDate) {
        alert(`Please select due date for item ${i + 1}`);
        return false;
      }

      if (!item.installmentNo || Number(item.installmentNo) <= 0) {
        alert(`Please enter valid installment number for item ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const payload = {
        studentId,
        academicYear: academicYear.trim(),
        remarks: remarks.trim(),
        feeItems: items.map((item) => ({
          feeHeadId: item.feeHeadId,
          title: item.title.trim(),
          amount: Number(item.amount),
          dueDate: item.dueDate,
          installmentNo: Number(item.installmentNo),
          fineAmount: Number(item.fineAmount || 0),
        })),
      };

      await API.post("/invoices", payload);

      alert("Invoice assigned successfully");
      resetForm();
    } catch (error) {
      console.error("Invoice creation error:", error);
      alert(
        error?.response?.data?.message || "Failed to assign fees"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white shadow rounded-xl p-6 text-center text-gray-600">
          Loading students and fee heads...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Assign Fees / Create Invoice</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {(student.fullName || student.name || "Unnamed Student")} -{" "}
                {student.regNo || student.registrationNumber || "No Reg No"}
              </option>
            ))}
          </select>

          <input
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="Academic Year (Eg: 2025-2026)"
            className="border p-3 rounded-lg"
            required
          />

          <input
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Remarks"
            className="border p-3 rounded-lg"
          />
        </div>

        {students.length === 0 && (
          <div className="text-sm text-red-600">
            No students found. Please create students first.
          </div>
        )}

        {feeHeads.length === 0 && (
          <div className="text-sm text-red-600">
            No fee heads found. Please create fee heads first.
          </div>
        )}

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 border p-4 rounded-xl"
            >
              <select
                value={item.feeHeadId}
                onChange={(e) =>
                  handleItemChange(index, "feeHeadId", e.target.value)
                }
                className="border p-3 rounded-lg"
                required
              >
                <option value="">Select Fee Head</option>
                {feeHeads.map((head) => (
                  <option key={head._id} value={head._id}>
                    {head.name} ({head.code})
                  </option>
                ))}
              </select>

              <input
                value={item.title}
                onChange={(e) =>
                  handleItemChange(index, "title", e.target.value)
                }
                placeholder="Title"
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                min="0"
                value={item.amount}
                onChange={(e) =>
                  handleItemChange(index, "amount", e.target.value)
                }
                placeholder="Amount"
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="date"
                value={item.dueDate}
                onChange={(e) =>
                  handleItemChange(index, "dueDate", e.target.value)
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                min="1"
                value={item.installmentNo}
                onChange={(e) =>
                  handleItemChange(index, "installmentNo", e.target.value)
                }
                placeholder="Installment"
                className="border p-3 rounded-lg"
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={item.fineAmount}
                  onChange={(e) =>
                    handleItemChange(index, "fineAmount", e.target.value)
                  }
                  placeholder="Fine"
                  className="border p-3 rounded-lg w-full"
                />

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="bg-red-500 text-white px-4 rounded-lg"
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={addItem}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Add Item
          </button>

          <button
            type="submit"
            disabled={submitting || students.length === 0 || feeHeads.length === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-gray-400"
          >
            {submitting ? "Creating Invoice..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}