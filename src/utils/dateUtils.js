// 202605181125 → 18일 11:25
export function formatDateTime(dateTimeStr) {
  if (!dateTimeStr || dateTimeStr.length < 12) return '-'
  const month = dateTimeStr.substring(4, 6)
  const day   = dateTimeStr.substring(6, 8)
  const hour  = dateTimeStr.substring(8, 10)
  const min   = dateTimeStr.substring(10, 12)
  return `${month}/${day} ${hour}:${min}`
}

// 운항상태 → 색상
export function getRemarkColor(remark) {
  const colors = {
    '출발': '#52c41a',
    '도착': '#1890ff',
    '지연': '#faad14',
    '결항': '#ff4d4f',
    '탑승중': '#722ed1',
    '마감예정': '#fa8c16',
    '탑승마감': '#f5222d',
    '탑승준비': '#13c2c2',
    '착륙': '#1890ff',
    '회항': '#ff4d4f',
  }
  return colors[remark] || '#8892b0'
}

// 터미널 코드 → 한글
export function getTerminalName(terminalId) {
  const terminals = {
    'P01': '제1터미널',
    'P02': '탑승동',
    'P03': '제2터미널',
  }
  return terminals[terminalId] || terminalId
}