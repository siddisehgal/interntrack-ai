import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside style={{ width: '250px', borderRight: '1px solid #e2e8f0', padding: '20px' }}>
      <h2>InternTrack AI</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/applications">Applications</Link>
        <Link to="/resume-analyzer">Resume Analyzer</Link>
      </nav>
    </aside>
  );
}