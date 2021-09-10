# NeChaBloTS

Nextjs + Chakra UI + Blog + TypeScript

# Create

## Step 1 Nextjs

```
yarn create next-app --typescript
``` 

## Step 2 Chakra UI

```
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

Change _app.tsx for used chakra-ui commponent + theme
``` typescript
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import theme from '../theme/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp

```
Create directory and file for theme.

``` shell
mkdir -p themes
cat > themes/themes.js
```

``` typescript
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
```

## Test work

Adaptation chakra ui + theme to demo page.


## Markdown in chakra

```
yarn add @chakra-ui/icons chakra-ui-markdown-renderer react-markdown react-icons gray-matter react-syntax-highlighter
yarn add @types/react @types/react-syntax-highlighter
```






