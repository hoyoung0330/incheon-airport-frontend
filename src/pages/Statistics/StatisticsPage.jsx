import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { useStatistics } from '../../hooks/useFlight'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'

export default function StatisticsPage() {
  const { isLoading, isError, airlineChartData, hourlyStats, airportChartData } = useStatistics()

  if (isLoading) return <LoadingSpinner />
  if (isError)   return <ErrorMessage />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* 시간대별 운항 현황 */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '20px 24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1f36', marginBottom: '20px' }}>
          🕐 시간대별 운항 현황
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={hourlyStats} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 11, fill: '#8892b0' }}
              interval={1}
            />
            <YAxis tick={{ fontSize: 11, fill: '#8892b0' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="departure" name="출발편" fill="#4f8ef7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="arrival"   name="도착편" fill="#52c41a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 항공사별 + 공항별 */}
      <div style={{ display: 'flex', gap: '16px' }}>

        {/* 항공사별 운항 편수 TOP 10 */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '10px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1f36', marginBottom: '20px' }}>
            🏢 항공사별 운항 편수 TOP 10
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={airlineChartData}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 60, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#8892b0' }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#8892b0' }}
                width={60}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="departure" name="출발편" fill="#4f8ef7" radius={[0, 4, 4, 0]} stackId="a" />
              <Bar dataKey="arrival"   name="도착편" fill="#52c41a" radius={[0, 4, 4, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 노선별 운항 편수 TOP 10 */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '10px',
          padding: '20px 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1f36', marginBottom: '20px' }}>
            🌏 노선별 운항 편수 TOP 10
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={airportChartData}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 60, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#8892b0' }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#8892b0' }}
                width={60}
              />
              <Tooltip />
              <Bar dataKey="value" name="운항 편수" fill="#722ed1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}