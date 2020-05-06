import { createMuiTheme } from '@material-ui/core/styles'

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff9800',
    },
    type: 'dark',
  },
  overrides: {
    MuiListItem: {
      root: {
        '&$selected': {
          boxShadow: 'inset -2px 0 0 0 #ff9800',
        },
      },
    },
    MuiListItemText: {
      primary: {
        color: '#ffffff',
      },
    },
  },
})

export const lightTheme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        '&$selected': {
          boxShadow: 'inset -2px 0 0 0 #3f51b5',
        },
      },
    },
  },
})
