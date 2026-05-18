import { NavLink } from 'react-router-dom'

const menu = [
  { path: '/dashboard', label: '대시보드', icon: '📊' },
  { path: '/departures', label: '출발편', icon: '✈️' },
  { path: '/arrivals', label: '도착편', icon: '🛬' },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      background: '#1a1f36',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
      minHeight: '100vh',
    }}>
      {/* 로고 */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #2d3561',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
      }}>
        ✈ 인천공항 대시보드
      </div>

      {/* 메뉴 */}
      <nav style={{ padding: '16px 0' }}>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              color: isActive ? '#fff' : '#8892b0',
              background: isActive ? '#2d3561' : 'transparent',
              textDecoration: 'none',
              fontSize: '14px',
              borderLeft: isActive ? '3px solid #4f8ef7' : '3px solid transparent',
              transition: 'all 0.2s',
            })}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}