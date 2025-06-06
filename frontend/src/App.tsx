import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Invoices from "./pages/Invoices";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Users from "./pages/Users";
import CreateUserPage from "./pages/Users/create";
import EditUserPage from "./pages/Users/edit";
import EditInvoicePage from "./pages/Invoices/edit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Requests from "./pages/Requests";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ERole } from "./types";
import EditRequestPage from "./pages/Requests/edit";
import Logs from "./pages/InvoiceStatusAudits";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Dashboard Layout */}
              <Route element={<AppLayout />}>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                {/* <Route index path="/" element={<Home />} /> */}

                {/* Others Page */}
                {/* <Route path="/profile" element={<UserProfiles />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} /> */}

                {/* Forms */}
                {/* <Route path="/form-elements" element={<FormElements />} /> */}

                {/* Tables */}
                {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

                <Route
                  path="/invoices"
                  element={
                    <ProtectedRoute
                      roles={[
                        ERole.ROLE_FINANCE_HEAD,
                        ERole.ROLE_FINANCE,
                        ERole.ROLE_FINISH_GOOD,
                        ERole.ROLE_FINISH_GOOD_HEAD,
                      ]}
                    >
                      <Invoices />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/invoices/:id/edit"
                  element={
                    <ProtectedRoute
                      roles={[
                        ERole.ROLE_FINANCE_HEAD,
                        ERole.ROLE_FINANCE,
                        ERole.ROLE_FINISH_GOOD,
                        ERole.ROLE_FINISH_GOOD_HEAD,
                      ]}
                    >
                      <EditInvoicePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/requests"
                  element={
                    <ProtectedRoute
                      roles={[
                        ERole.ROLE_FINANCE_HEAD,
                        ERole.ROLE_FINISH_GOOD_HEAD,
                      ]}
                    >
                      <Requests />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/requests/:id/edit"
                  element={
                    <ProtectedRoute
                      roles={[
                        ERole.ROLE_FINANCE_HEAD,
                        ERole.ROLE_FINISH_GOOD_HEAD,
                      ]}
                    >
                      <EditRequestPage />
                    </ProtectedRoute>
                  }
                />

                {/* <Route path="/users" element={<Users />} /> */}
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute roles={[ERole.ROLE_ADMIN]}>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route path="/users/create" element={<CreateUserPage />} />
                <Route path="/users/:id/edit" element={<EditUserPage />} />

                <Route
                  path="/logs"
                  element={
                    <ProtectedRoute
                      roles={[
                        ERole.ROLE_FINANCE,
                        ERole.ROLE_FINANCE_HEAD,
                        ERole.ROLE_FINISH_GOOD,
                        ERole.ROLE_FINISH_GOOD_HEAD,
                      ]}
                    >
                      <Logs />
                    </ProtectedRoute>
                  }
                />

                {/* Ui Elements */}
                {/* <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} /> */}

                {/* Charts */}
                {/* <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} /> */}
              </Route>

              {/* Auth Layout */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
              <Route path="/notFound" element={<NotFound />} />
            </Routes>
          </Router>
          <ToastContainer autoClose={2000} theme="colored" />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
