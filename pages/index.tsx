import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box, Link, Heading, Code  } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box className={styles.container}>

      <main className={styles.main}>
        <Heading className={styles.title}>
          Welcome to <Link href="https://nextjs.org">Next.js!</Link>
        </Heading>

        <Box className={styles.description}>
          Get started by editing{' '}
          <Code className={styles.code}>pages/index.js</Code>
        </Box>

        <Box className={styles.grid}>
          <Link href="https://nextjs.org/docs" className={styles.card}>
            <Heading size="xl">Documentation &rarr;</Heading>
            <Box>Find in-depth information about Next.js features and API.</Box>
          </Link>

          <Link href="https://nextjs.org/learn" className={styles.card}>
          <Heading size="xl">Learn &rarr;</Heading>
            <Box>Learn about Next.js in an interactive course with quizzes!</Box>
          </Link>

          <Link
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <Heading size="xl">Examples &rarr;</Heading>
            <Box>Discover and deploy boilerplate example Next.js projects.</Box>
          </Link>

          <Link
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <Heading size="xl">Deploy &rarr;</Heading>
            <Box>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </Box>
          </Link>
        </Box>
      </main>

    </Box>
  )
}

export default Home
