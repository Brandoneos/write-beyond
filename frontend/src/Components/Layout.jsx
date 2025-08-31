import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Sidebar />
      {/* shift content to the right by sidebar width */}
      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
