import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/dashboard':  '대시보드',
  '/departures': '출발편 현황',
  '/arrivals':   '도착편 현황',
  '/statistics': '통계 분석',   // ← 추가
}

export default function Header() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || '인천공항 대시보드'
  const now = new Date().toLocaleString('ko-KR')

  return (
    <header style={{
      background: '#fff',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e8e8e8',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    }}>
      <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1f36' }}>
        {title}
      </h1>
      <span style={{ fontSize: '13px', color: '#8892b0' }}>
        🕐 {now}
      </span>
    </header>
  )
}