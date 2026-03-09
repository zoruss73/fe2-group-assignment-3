import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";
import Student from "./pages/Student";
import Attendance from "./pages/Attendance";
import Appointment from "./pages/Appointment";
import Document from "./pages/Document";

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors theme="dark" />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/students" element={<Student />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/documents" element={<Document />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
