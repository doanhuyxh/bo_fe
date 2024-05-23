import { format } from 'd3-format'

export const BASE_BINANCE_URL = 'https://api.binance.com/api/v3/klines?'
export const WS_BINACE_URL = 'wss://stream.binance.com:9443/ws'

export const candleStickDefaultConfig = {
  dateTimeFormat: "%d %b '%y \xa0 %H:%M",
  height: 0,
  margin: { left: 0, right: 48, top: 0, bottom: 24 },
  priceDisplayFormat: format('.2f'),
  ratio: 2,
  width: 0
}

export const axisStyles = {
  strokeStyle: '#383E55', // Color.GRAY
  strokeWidth: 2,
  tickLabelFill: '#9EAAC7', // Color.LIGHT_GRAY
  tickStrokeStyle: '#383E55',
  gridLinesStrokeStyle: 'rgba(56, 62, 85, 0.5)', // Color.GRAY w Opacity
  fontSize: 10
}
export const axisStylesY = {
  strokeStyle: 'transparent',
  strokeWidth: 1,
  tickLabelFill: 'rgba(255, 255, 255, 0.75)',
  tickStrokeStyle: '#383E55',
  gridLinesStrokeStyle: 'rgba(255, 255, 255, 0.1)',
  fontSize: 13
}
export const axisStylesX = {
  strokeStyle: 'transparent', // Color.GRAY
  strokeWidth: 1,
  tickLabelFill: 'rgba(255, 255, 255, 0.75)',
  tickStrokeStyle: '#383E55',
  gridLinesStrokeStyle: 'transparent', // Color.GRAY w Opacity
  fontSize: 13
}

export const coordinateStyles = {
  fill: '#383E55',
  textFill: '#FFFFFF'
}
export const fontSize = {
  fontSize: 10
}
export const zoomButtonStyles = {
  fill: '#383E55',
  fillOpacity: 0.75,
  strokeWidth: 0,
  textFill: '#9EAAC7'
}

export const crossHairStyles = {
  strokeStyle: '#9EAAC7'
}
