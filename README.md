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

## Add new field in "article" register.

This is simple, add interface new field, in this case, add 'creator' field ( interfaces/articles.ts )
``` ts
interface ArticleMeta {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    creator: string;
}
```
Add, in all contents a new field in first block, like ( contents/*.mdx)
```
---
title: Second content
description: Bon cap de setmana
thumbnail: https://static.wixstatic.com/media/56fc9d_cf53c73a211d465fa52af8b073e31400~mv2.png
creator: John Smith
---
```
Show, if you want, new field in card articles ( components/article-card.tsx)
``` ts
...
              <chakra.span
                fontSize="xs"
                textTransform="uppercase"
                color={useColorModeValue("brand.600", "brand.400")}
              >
                {article.meta.creator}
              </chakra.span>
...
```





