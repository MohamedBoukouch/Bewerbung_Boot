import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function DashboardClientLayout() {
  const { pathname } = useLocation();

  // All pages that should NOT show Navbar/Footer
  const hiddenLayoutRoutes = [
    "/dashboard-client/lesen/",
    "/dashboard-client/sprachbausteine/",
    // "/dashboard-client/horen/",
    // "/dashboard-client/schreiben/",
    // "/dashboard-client/sprechen/",
  ];

  const hideLayout = hiddenLayoutRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}

      <main className={`flex-1 ${!hideLayout ? "pt-24" : ""}`}>
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}