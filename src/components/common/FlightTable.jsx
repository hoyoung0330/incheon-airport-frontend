import { formatDateTime, getRemarkColor, getTerminalName } from '../../utils/dateUtils'

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: '600',
  color: '#8892b0',
  background: '#f8f9fc',
  borderBottom: '1px solid #e8e8e8',
  whiteSpace: 'nowrap',
}

const tdStyle = {
  padding: '12px 16px',
  fontSize: '14px',
  color: '#333',
  borderBottom: '1px solid #f0f0f0',
  whiteSpace: 'nowrap',
}

export default function FlightTable({ flights, type }) {
  if (!flights.length) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px',
        color: '#8892b0',
        fontSize: '15px',
      }}>
        항공편 데이터가 없습니다.
      </div>
    )
  }

  const isDeparture = type === 'departure'

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>편명</th>
            <th style={thStyle}>항공사</th>
            <th style={thStyle}>{isDeparture ? '도착지' : '출발지'}</th>
            <th style={thStyle}>예정시간</th>
            <th style={thStyle}>변경시간</th>
            <th style={thStyle}>터미널</th>
            <th style={thStyle}>{isDeparture ? '탑승구' : '수하물'}</th>
            {isDeparture && <th style={thStyle}>체크인</th>}
            <th style={thStyle}>상태</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={`${flight.flightId}-${index}`}
              style={{ transition: 'background 0.15s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fc'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ ...tdStyle, fontWeight: '600', color: '#1a1f36' }}>
                {flight.flightId}
              </td>
              <td style={tdStyle}>{flight.airline}</td>
              <td style={tdStyle}>
                <div>{flight.airport}</div>
                <div style={{ fontSize: '12px', color: '#8892b0' }}>
                  {flight.airportCode}
                </div>
              </td>
              <td style={tdStyle}>{formatDateTime(flight.scheduleDateTime)}</td>
              <td style={tdStyle}>{formatDateTime(flight.estimatedDateTime)}</td>
              <td style={tdStyle}>{getTerminalName(flight.terminalid)}</td>
              <td style={tdStyle}>
                {isDeparture ? (flight.gatenumber || '-') : (flight.carousel || '-')}
              </td>
              {isDeparture && (
                <td style={tdStyle}>{flight.chkinrange || '-'}</td>
              )}
              <td style={tdStyle}>
                <span style={{
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#fff',
                  background: getRemarkColor(flight.remark),
                }}>
                  {flight.remark || '미정'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}