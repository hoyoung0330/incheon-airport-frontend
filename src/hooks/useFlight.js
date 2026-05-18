import { useQuery } from "@tanstack/react-query";
import { flightApi } from "../api/flightApi";

// 도착편 조회 훅
export function useArrivals(airportCode) {
  return useQuery({
    queryKey: ["arrivals", airportCode],
    queryFn: () => flightApi.getArrivals(airportCode),
    refetchInterval: 3 * 60 * 1000,
  });
}

// 출발편 조회 훅
export function useDepartures(airportCode) {
  return useQuery({
    queryKey: ["departures", airportCode],
    queryFn: () => flightApi.getDepartures(airportCode),
    refetchInterval: 3 * 60 * 1000,
  });
}

// 대시보드용 훅 (출발/도착 동시 조회)
export function useDashboard() {
  const arrivals = useArrivals("");
  const departures = useDepartures("");

  const arrivalFlights = arrivals.data?.data?.flights || [];
  const departureFlights = departures.data?.data?.flights || [];

  // 운항상태 집계
  const countByRemark = (flights) =>
    flights.reduce((acc, f) => {
      const remark = f.remark || '미정'  // ← null이면 '미정'으로
      acc[remark] = (acc[remark] || 0) + 1;
      return acc;
    }, {});

  const arrivalStats = countByRemark(arrivalFlights);
  const departureStats = countByRemark(departureFlights);

  // 지연/결항 수
  const delayCount =
    (arrivalStats["지연"] || 0) + (departureStats["지연"] || 0);
  const cancelCount =
    (arrivalStats["결항"] || 0) + (departureStats["결항"] || 0);

  // 터미널별 집계
  const terminalStats = [...arrivalFlights, ...departureFlights].reduce(
    (acc, f) => {
      const t = f.terminalid || "기타";
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    },
    {},
  );

  // 출발 상태별 차트 데이터
  const departureChartData = Object.entries(departureStats).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  // 도착 상태별 차트 데이터
  const arrivalChartData = Object.entries(arrivalStats).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  return {
    isLoading: arrivals.isLoading || departures.isLoading,
    isError: arrivals.isError || departures.isError,
    kpi: {
      totalDepartures: departures.data?.data?.totalCount || 0,
      totalArrivals: arrivals.data?.data?.totalCount || 0,
      delayCount,
      cancelCount,
    },
    departureChartData,
    arrivalChartData,
    terminalStats,
    recentArrivals: arrivalFlights.slice(0, 5),
    recentDepartures: departureFlights.slice(0, 5),
    dataUpdatedAt: arrivals.dataUpdatedAt,
  };
}

// 통계 페이지용 훅
export function useStatistics() {
  const arrivals   = useArrivals('')
  const departures = useDepartures('')

  const arrivalFlights   = arrivals.data?.data?.flights  || []
  const departureFlights = departures.data?.data?.flights || []

  // 항공사별 집계
  const airlineStats = [...arrivalFlights, ...departureFlights]
    .reduce((acc, f) => {
      if (!f.airline) return acc
      if (!acc[f.airline]) acc[f.airline] = { arrival: 0, departure: 0, total: 0 }
      if (arrivalFlights.includes(f)) acc[f.airline].arrival++
      else acc[f.airline].departure++
      acc[f.airline].total++
      return acc
    }, {})

  const airlineChartData = Object.entries(airlineStats)
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)  // 상위 10개

  // 시간대별 집계
  const hourlyStats = Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}시`,
    departure: 0,
    arrival: 0,
  }))

  departureFlights.forEach((f) => {
    if (!f.scheduleDateTime || f.scheduleDateTime.length < 10) return
    const hour = parseInt(f.scheduleDateTime.substring(8, 10), 10)
    if (hour >= 0 && hour < 24) hourlyStats[hour].departure++
  })

  arrivalFlights.forEach((f) => {
    if (!f.scheduleDateTime || f.scheduleDateTime.length < 10) return
    const hour = parseInt(f.scheduleDateTime.substring(8, 10), 10)
    if (hour >= 0 && hour < 24) hourlyStats[hour].arrival++
  })

  // 공항별 집계 (상위 10개)
  const airportStats = [...arrivalFlights, ...departureFlights]
    .reduce((acc, f) => {
      if (!f.airport) return acc
      acc[f.airport] = (acc[f.airport] || 0) + 1
      return acc
    }, {})

  const airportChartData = Object.entries(airportStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  return {
    isLoading: arrivals.isLoading || departures.isLoading,
    isError:   arrivals.isError   || departures.isError,
    airlineChartData,
    hourlyStats,
    airportChartData,
  }
}