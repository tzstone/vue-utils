import * as VTable from '@visactor/vtable'

function getBackgroundColor(args) {
  const { row, table } = args
  const index = row - table.frozenRowCount
  if (!(index & 1)) {
    return '#2d3137'
  }
  return '#282a2e'
}

export const lightTheme = VTable.themes.ARCO.extends({
  frameStyle: {
    cornerRadius: 0
  }
})

export const darkTheme = VTable.themes.ARCO.extends({
  underlayBackgroundColor: 'transparent',
  defaultStyle: {
    color: '#D3D5DA',
    bgColor: '#373b45',
    borderColor: '#444A54',
    hover: {
      cellBgColor: '#2F4774'
    }
  },
  headerStyle: {
    color: '#D3D5DA',
    bgColor: '#373b45',
    borderColor: '#444A54',
    hover: {
      cellBgColor: '#2F4774'
    }
  },
  bodyStyle: {
    color: '#e5e7ea',
    bgColor: getBackgroundColor,
    borderColor: '#444A54',
    hover: {
      cellBgColor: '#29364D',
      // TODO:
      inlineRowBgColor: '#373b45',
      inlineColumnBgColor: '#373b45'
    }
  },
  frameStyle: {
    cornerRadius: 0,
    borderColor: '#d1d5da',
    shadowColor: 'rgba(00, 24, 47, 0.06)'
  },
  columnResize: {
    lineWidth: 1,
    lineColor: '#416EFF',
    bgColor: '#D9E2FF'
  },
  frozenColumnLine: {
    shadow: {
      width: 4,
      startColor: 'rgba(00, 24, 47, 0.05)',
      endColor: 'rgba(00, 24, 47, 0)'
    }
  },
  selectionStyle: {
    cellBgColor: 'rgba(255, 255, 255, 0.1)',
    // inlineColumnBgColor: "#82b2f5",
    cellBorderColor: '#4284FF'
  },
  tooltipStyle: {
    bgColor: '#FFF',
    color: '#000'
  }
})
