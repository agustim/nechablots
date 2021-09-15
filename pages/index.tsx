import type { FunctionComponent } from 'react'
import styles from '../styles/Home.module.css'
import { Box, Heading } from '@chakra-ui/react'
import ArticleLink from '../components/article-link'
import { ArticleInfo } from '../interfaces/article'
import fs from 'fs'
import matter from 'gray-matter'

interface IProps {
  articles: ArticleInfo[]
}

const Home: FunctionComponent<IProps> = ({ articles }) => {
  return (
    <Box className={styles.container}>

      <main className={styles.main}>
        <Heading className={styles.title}>
          Article List
        </Heading>

        <Box className={styles.grid}>
            {
              
              articles.map((article, i) => (
                  <ArticleLink key={i} article={article} />
              ))
            }
        </Box>
      </main>

    </Box>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync("contents");
  
  let articles = files.map(file => {
      const data = fs
          .readFileSync(`contents/${file}`)
          .toString();

          const info = matter(data);

          const article = {
            meta: {
              ...info.data,
            },
            slug: file.split('.')[0],
            content: info.content
          }

      return article;
  });

  return {
      props: {
          articles: articles
      }
  };
}


export default Home
