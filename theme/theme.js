import { extendTheme } from "@chakra-ui/react"

const fonts =   {
  body: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  heading: "Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  mono: "monospace",
}

const breakpoints = ['450px', '800px', '1080px', '2400px']

const theme = extendTheme({
  ...extendTheme,
  colors: {
    ...extendTheme.colors,
    custom: {500: '#1f8a9f'},
  },
  fonts,
  fontWeights: {
    thin: 100,
    normal: 300,
    medium: 400,
    semibold: 500,
    bold: 600,
    black: 900,
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    normal: "16px",
    lg: "20px",
    xl: "24px",
    xxl: "30px",
    xxxl: "40px",
    big: "60px",
    huge: "80px",
  },
  breakpoints,

})

export default theme