import type { FC } from 'react'
import styles from '../../../styles/Home.module.css'
import { Box, Heading, Link, UnorderedList, ListItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const baseUrl = ""

const BackofficeHome: FC = () => {

    const [filenames, setFilenames] = useState([])

    useEffect(() => {
        const url = baseUrl + `/api/articles`
        fetch( url )
        .then(res => res.json())
        .then((data) => {
            setFilenames(data)
        })
        .catch(error => console.error(error))
    },[])

  return (
    <Box className={styles.container}>

      <main className={styles.main}>
        <Heading className={styles.title}>
          Article List
        </Heading>

        <Box className={styles.grid}>
        <UnorderedList>
            {
              filenames.map((filename,i) => (
                <ListItem key={i}>
                    <Link href={"./article/" + filename}>{filename}</Link>
                </ListItem>
              ))
            }
        </UnorderedList>
        </Box>
      </main>

    </Box>
  )
}
export default BackofficeHome