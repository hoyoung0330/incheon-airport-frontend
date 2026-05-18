import axiosInstance from './axiosInstance'

export const flightApi = {
  // 도착편 조회
  getArrivals: (airportCode) =>
    axiosInstance.get('/api/flights/arrivals', {
      params: airportCode ? { airportCode } : {},
    }),

  // 출발편 조회
  getDepartures: (airportCode) =>
    axiosInstance.get('/api/flights/departures', {
      params: airportCode ? { airportCode } : {},
    }),
}