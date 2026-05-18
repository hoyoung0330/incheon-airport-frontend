export default function ErrorMessage({ message = '데이터를 불러오지 못했습니다.' }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      flexDirection: 'column',
      gap: '12px',
      color: '#ff4d4f',
    }}>
      <span style={{ fontSize: '40px' }}>⚠️</span>
      <span style={{ fontSize: '15px' }}>{message}</span>
    </div>
  )
}