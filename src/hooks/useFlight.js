import { useQuery } from '@tanstack/react-query'
import { flightApi } from '../api/flightApi'

// 도착편 조회 훅
export function useArrivals(airportCode) {
  return useQuery({
    queryKey: ['arrivals', airportCode],
    queryFn: () => flightApi.getArrivals(airportCode),
    refetchInterval: 3 * 60 * 1000, // 3분마다 자동 갱신
  })
}

// 출발편 조회 훅
export function useDepartures(airportCode) {
  return useQuery({
    queryKey: ['departures', airportCode],
    queryFn: () => flightApi.getDepartures(airportCode),
    refetchInterval: 3 * 60 * 1000, // 3분마다 자동 갱신
  })
}