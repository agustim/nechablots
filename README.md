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

Change _app.tsx for used chakra-ui commponent.
``` typescript
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp

```



