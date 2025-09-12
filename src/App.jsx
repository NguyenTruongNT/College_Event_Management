import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Sidebar from "./components/shared/Sidebar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventCategoryPage from "./pages/EventCategoryPage";
import MediaLibraryPage from "./pages/MediaLibraryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import SitemapPage from "./pages/SitemapPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import OrganizerDashboardPage from "./pages/OrganizerDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CertificatePage from "./pages/CertificatePage";
import EventRegisted from "./components/public/EventRegisted";
import FavoritePhotosPage from "./pages/FavoritePhotosPage";
import NotificationCard from "./components/public/NotificationCard";
import Settings from "./pages/Settings";
import RateEvents from "./pages/RateEvents";
import RegistedEventPage from "./pages/RegistedEventPage";
import ManageParticipants from "./components/organizer/ManageParticipants";
import Certificates from "./components/organizer/Certificates";
import MediaLibrary from "./components/organizer/MediaLibrary";
import Notifications from "./components/organizer/Notifications";
import Reports from "./components/organizer/Reports";
import CreateEvent from "./components/organizer/CreateEvent";
import ManageEvents from "./components/organizer/ManageEvents";
import Dashboard from "./components/organizer/Dashboard";
import ManageUsersPage from "./pages/ManageUsersPage";
import ApproveEventsPage from "./pages/ApproveEventsPage";
import ModerateContentPage from "./pages/ModerateContentPage";
import SendNotificationsPage from "./pages/SendNotificationsPage";
import ReportsPage from "./pages/ReportsPage";
import SystemSettingsPage from "./pages/SystemSettingsPage";
import AdminDashboardHome from "./components/admin/AdminDashboardHome";
function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role))
      return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Sidebar role={user ? user.role : "guest"} />

      <div style={{ marginLeft: "250px" }}>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventCategoryPage />} />
            <Route
              path="/event-detail/:eventId"
              element={<EventDetailPage />}
            />
            <Route path="/media" element={<MediaLibraryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route
              path="/forgot-password"
              element={user ? <Navigate to="/" /> : <ForgotPasswordPage />}
            />

            {/* Routes for Student */}

            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/student/registered-events"
              element={<RegistedEventPage />}
            />
            <Route
              path="/dashboard/student/certificates"
              element={<CertificatePage />}
            />
            <Route
              path="/dashboard/student/favorite-photos"
              element={<FavoritePhotosPage />}
            />
            <Route
              path="/dashboard/student/notifications"
              element={<NotificationCard />}
            />
            <Route
              path="/dashboard/student/rate-events"
              element={<RateEvents />}
            />

            <Route path="/dashboard/student/settings" element={<Settings />} />

            {/* Organizer routes */}
            <Route
              path="/dashboard/organizer"
              element={
                <ProtectedRoute allowedRoles={["organizer"]}>
                  <OrganizerDashboardPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="manage-events" element={<ManageEvents />} />
              <Route
                path="manage-participants"
                element={<ManageParticipants />}
              />
              <Route path="certificates" element={<Certificates />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="send-notifications" element={<Notifications />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            {/* Admin routes */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboardHome />} />
              <Route path="manage-users" element={<ManageUsersPage />} />
              <Route path="approve-events" element={<ApproveEventsPage />} />
              <Route
                path="moderate-content"
                element={<ModerateContentPage />}
              />
              <Route
                path="send-notifications"
                element={<SendNotificationsPage />}
              />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="system-settings" element={<SystemSettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
