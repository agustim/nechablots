import type { FC } from 'react'
import useSWR from 'swr'
import { Box, SimpleGrid, Text, Heading, GridItem, chakra, Stack, 
         useColorModeValue, FormControl, FormLabel, FormHelperText, Input, Textarea, Button } from '@chakra-ui/react'
import { ArticleInfo, ArticleMeta } from '../../interfaces/article'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { route } from 'next/dist/server/router'

interface Props {
  article: ArticleInfo
}

const fetcher = (url:string) => fetch(url).then(res => res.json())
const baseUrl = "http://localhost:3000"

/*
export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const url = baseUrl + `/api/articles/${slug}`
  const data  = await fetcher( url )

  return {
      props: {
          article: data
      }
  }
}

export async function getStaticPaths() {

  return {
    fallback: true,
    paths: [
      {params : { slug: ""  } }
    ]
  }
}*/
const ArticleForm: FC<Props> = () => {
  
  const router = useRouter()
  const { slug } = router.query;
  
  var article:ArticleInfo =  ({} as any) as ArticleInfo;

  const [formData, setFormData] = useState(article)
  const [visible, setVisible] = useState(false)

  useEffect(()=>{
    if (slug) {
      console.log("useEffect")
      const url = baseUrl + `/api/articles/${slug}`
      fetch( url )
      .then(res => res.json())
      .then((data) => {
        setFormData(data)
        article = {...data}
        console.log(article)
        setVisible(true)
      })
      .catch(error => console.error(error))
    }
  },[slug])
  

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {

    var art:ArticleInfo = { ...article }
    var meta:ArticleMeta = { ...article.meta}
    if (e.currentTarget.id == "content") {
      art.content = e.currentTarget.value
    } else {
      meta = {
        ...meta,
        [e.currentTarget.id]: e.currentTarget.value
      }
    }
    setFormData({
      ...art,
      meta
    })
  }

  //const keysOfArticle = Object.keys(formData?.meta ?? {}) 

  return (
      <Box mt={[10, 0]}>
      <SimpleGrid
        display={{ base: "initial", md: "grid" }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
      >
        <GridItem colSpan={{ md: 1 }}>
          <Box px={[4, 0]}>
            <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
              Agenda
            </Heading>
            <Text
              mt={1}
              fontSize="sm"
            >
            </Text>
          </Box>
        </GridItem>
        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, "md"]}
            overflow={{ sm: "hidden" }}
            >
            { (visible) && (
            <Stack
              px={4}
              py={5}
              p={[null, 6]}
              spacing={6}
            >
                <SimpleGrid columns={6} spacing={6}>
                {
                  Object.keys(formData?.meta ?? {}).map((field, i) => {
                    const fieldName = formData?.meta[field] ?? ""
                    return (
                      <FormControl key={i} as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor={field}
                      fontSize="sm"
                      fontWeight="md"
                      >
                      {field}
                    </FormLabel>
                    <Input
                      type="text"
                      name={field}
                      id={field}
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={fieldName}
                      onChange={handleForm}
                      />
                  </FormControl>
                  )
                })
              }
              </SimpleGrid>
              <SimpleGrid>
                  <FormControl id="content" mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      >
                      Content
                    </FormLabel>
                    <Textarea
                      id="content"
                      name="content"
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: "sm" }}
                      />
                    <FormHelperText>
                      Content with Markdown format.
                    </FormHelperText>
                  </FormControl>
              </SimpleGrid>
            </Stack>
            ) }
            <Box
              px={{ base: 4, sm: 6 }}
              py={3}
              bg={useColorModeValue("gray.50", "gray.900")}
              textAlign="right"
            >
              <Button
                type="submit"
                colorScheme="brand"
                _focus={{ shadow: "" }}
                fontWeight="md"
              >
                Save
              </Button>
            </Box>
          </chakra.form>
        </GridItem>
      </SimpleGrid>

    </Box>
  )
  }

  export default ArticleForm;