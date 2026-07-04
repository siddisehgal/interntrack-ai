import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Internships from './pages/Internships';
import Resume from './pages/Resume';
import AIAssistant from './pages/Assistant';
import InterviewPrep from './pages/Interview';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Internships />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/internships/new" element={<Internships />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/prep" element={<InterviewPrep />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}