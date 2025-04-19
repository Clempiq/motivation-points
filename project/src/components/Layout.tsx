import { Link } from 'react-router-dom';

function Layout({ children, points }: { children: React.ReactNode; points: number }) {
  return (
    <div>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#6a0dad', // violet sympa
        color: 'white'
      }}>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '1.2rem' }}>
          <Link to="/taches" style={{ color: 'white', textDecoration: 'none' }}>Tâches</Link>
          <Link to="/recompenses" style={{ color: 'white', textDecoration: 'none' }}>Récompenses</Link>
        </nav>
        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          Points : {points}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: "1rem" }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
