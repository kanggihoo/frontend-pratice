import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatCards from "./components/StatCards";
import DataTable from "./components/DataTable";
import FavoritesPanel from "./components/FavoritesPanel";
import ToastContainer from "./components/ToastContainer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <StatCards />
          <FavoritesPanel />
          <DataTable />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
