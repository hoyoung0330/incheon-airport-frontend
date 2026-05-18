import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useDashboard } from '../../hooks/useFlight'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import KpiCard from '../../components/common/KpiCard'
import { formatDateTime, getRemarkColor, getTerminalName } from '../../utils/dateUtils'

const COLORS = ['#4f8ef7', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2', '#fa8c16']

export default function DashboardPage() {
  const {
    isLoading, isError,
    kpi, departureChartData, arrivalChartData,
    terminalStats, recentArrivals, recentDepartures,
    dataUpdatedAt,
  } = useDashboard()

  if (isLoading) return <LoadingSpinner />
  if (isError)   return <ErrorMessage />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* 갱신 시간 */}
      <div style={{ textAlign: 'right', fontSize: '13px', color: '#8892b0' }}>
        🔄 마지막 갱신: {dataUpdatedAt
          ? new Date(dataUpdatedAt).toLocaleTimeString('ko-KR')
          : '-'}
        <span style={{ marginLeft: '8px', color: '#4f8ef7' }}>
          (3분마다 자동 갱신)
        </span>
      </div>

      {/* KPI 카드 */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <KpiCard
          title="총 출발편"
          value={kpi.totalDepartures}
          icon="✈️"
          color="#4f8ef7"
          sub="인천공항 출발 (7일)"
        />
        <KpiCard
          title="총 도착편"
          value={kpi.totalArrivals}
          icon="🛬"
          color="#52c41a"
          sub="인천공항 도착 (7일)"
        />
        <KpiCard
          title="지연 편수"
          value={kpi.delayCount}
          icon="⏰"
          color="#faad14"
          sub="출발 + 도착 합계"
        />
        <KpiCard
          title="결항 편수"
          value={kpi.cancelCount}
          icon="🚫"
          color="#ff4d4f"
          sub="출발 + 도착 합계"
        />
      </div>

      {/* 차트 영역 */}
      <div style={{ display: 'flex', gap: '16px' }}>

        {/* 출발편 상태 차트 */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '10px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1f36', marginBottom: '16px' }}>
            ✈️ 출발편 운항상태
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={departureChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {departureChartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={getRemarkColor(entry.name) || COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}편`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 도착편 상태 차트 */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '10px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1f36', marginBottom: '16px' }}>
            🛬 도착편 운항상태
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={arrivalChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {arrivalChartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={getRemarkColor(entry.name) || COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}편`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 터미널별 현황 */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '10px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1f36', marginBottom: '16px' }}>
            🏢 터미널별 현황
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(terminalStats)
              .sort((a, b) => b[1] - a[1])
              .map(([terminal, count]) => {
                const total = Object.values(terminalStats).reduce((a, b) => a + b, 0)
                const pct = Math.round((count / total) * 100)
                return (
                  <div key={terminal}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                      fontSize: '13px',
                    }}>
                      <span style={{ color: '#1a1f36', fontWeight: '500' }}>
                        {getTerminalName(terminal)}
                      </span>
                      <span style={{ color: '#8892b0' }}>{count}편 ({pct}%)</span>
                    </div>
                    <div style={{
                      height: '8px',
                      background: '#f0f2f5',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: '#4f8ef7',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* 최근 항공편 */}
      <div style={{ display: 'flex', gap: '16px' }}>

        {/* 최근 출발편 */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '10px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1f36', marginBottom: '16px' }}>
            ✈️ 최근 출발편
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['편명', '항공사', '도착지', '예정시간', '상태'].map(h => (
                  <th key={h} style={{
                    padding: '8px 12px', textAlign: 'left',
                    fontSize: '12px', color: '#8892b0',
                    borderBottom: '1px solid #f0f0f0',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentDepartures.map((f, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '600' }}>
                    {f.flightId}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '13px' }}>{f.airline}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px' }}>{f.airport}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px' }}>
                    {formatDateTime(f.scheduleDateTime)}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: '10px',
                      fontSize: '11px', fontWeight: '600', color: '#fff',
                      background: getRemarkColor(f.remark),
                    }}>
                      {f.remark || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 최근 도착편 */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '10px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1f36', marginBottom: '16px' }}>
            🛬 최근 도착편
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['편명', '항공사', '출발지', '예정시간', '상태'].map(h => (
                  <th key={h} style={{
                    padding: '8px 12px', textAlign: 'left',
                    fontSize: '12px', color: '#8892b0',
                    borderBottom: '1px solid #f0f0f0',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentArrivals.map((f, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: '600' }}>
                    {f.flightId}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '13px' }}>{f.airline}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px' }}>{f.airport}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px' }}>
                    {formatDateTime(f.scheduleDateTime)}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: '10px',
                      fontSize: '11px', fontWeight: '600', color: '#fff',
                      background: getRemarkColor(f.remark),
                    }}>
                      {f.remark || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}