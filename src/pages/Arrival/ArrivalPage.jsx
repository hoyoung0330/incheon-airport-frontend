import { useState } from 'react'
import { useArrivals } from '../../hooks/useFlight'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import FlightTable from '../../components/common/FlightTable'

export default function ArrivalPage() {
  const [airportCode, setAirportCode] = useState('')
  const [inputValue, setInputValue] = useState('')
  const { data, isLoading, isError, dataUpdatedAt } = useArrivals(airportCode)

  const handleSearch = () => setAirportCode(inputValue.toUpperCase())
  const handleReset  = () => { setAirportCode(''); setInputValue('') }

  const flights = data?.data?.flights || []
  const total   = data?.data?.totalCount || 0

  return (
    <div>
      {/* 상단 필터 */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '20px 24px',
        marginBottom: '16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <span style={{ fontWeight: '600', color: '#1a1f36' }}>출발지 공항</span>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="IATA 코드 입력 (예: NRT, LAX)"
          style={{
            padding: '8px 12px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '14px',
            width: '220px',
            outline: 'none',
          }}
        />
        <button onClick={handleSearch} style={{
          padding: '8px 16px',
          background: '#4f8ef7',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
        }}>
          검색
        </button>
        <button onClick={handleReset} style={{
          padding: '8px 16px',
          background: '#f0f2f5',
          color: '#555',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
        }}>
          초기화
        </button>
        <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#8892b0' }}>
          총 {total}편
          {dataUpdatedAt ? ` · 갱신 ${new Date(dataUpdatedAt).toLocaleTimeString('ko-KR')}` : ''}
        </span>
      </div>

      {/* 테이블 */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}>
        {isLoading ? <LoadingSpinner /> :
         isError   ? <ErrorMessage /> :
         <FlightTable flights={flights} type="arrival" />}
      </div>
    </div>
  )
}