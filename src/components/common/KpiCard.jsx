export default function KpiCard({ title, value, icon, color, sub }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '10px',
      padding: '20px 24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      borderTop: `4px solid ${color}`,
      flex: 1,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <div>
          <div style={{ fontSize: '13px', color: '#8892b0', marginBottom: '8px' }}>
            {title}
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#1a1f36' }}>
            {value.toLocaleString()}
          </div>
          {sub && (
            <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '6px' }}>
              {sub}
            </div>
          )}
        </div>
        <div style={{
          fontSize: '32px',
          opacity: 0.8,
        }}>
          {icon}
        </div>
      </div>
    </div>
  )
}