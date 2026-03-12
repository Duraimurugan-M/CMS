import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import FeeHeads from "./pages/fees/FeeHeads";
import AssignFees from "./pages/fees/AssignFees";
import Ledger from "./pages/ledger/Ledger";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow px-6 py-4 flex gap-6">
          <Link to="/fee-heads" className="font-medium text-blue-600">
            Fee Heads
          </Link>
          <Link to="/assign-fees" className="font-medium text-blue-600">
            Assign Fees
          </Link>
          <Link to="/ledger" className="font-medium text-blue-600">
            Ledger
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<FeeHeads />} />
          <Route path="/fee-heads" element={<FeeHeads />} />
          <Route path="/assign-fees" element={<AssignFees />} />
          <Route path="/ledger" element={<Ledger />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;