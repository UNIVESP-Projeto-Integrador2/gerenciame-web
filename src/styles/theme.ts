import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    green: '#4ad4ab',
    pink: '#ef41aa',
    purple: '#7c5acc',
    yellow: '#fbbf5e',
    blue: '#65b8dd',
  },
}

const font = '400 1rem "Roboto", sans-serif'

const styles = {
  global: {
    body: {
      font,
      bg: 'white',
      color: 'black',
    },
    input: {
      font,
    },
    select: {
      font,
    },
    button: {
      font,
      cursor: 'pointer',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
}

export const theme = extendTheme({ colors, styles })
