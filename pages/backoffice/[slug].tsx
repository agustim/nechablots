import type { FC } from 'react'
import useSWR from 'swr'
import { Box, SimpleGrid, Text, Heading, GridItem, chakra, Stack, 
         Alert, AlertIcon, AlertStatus, AlertTitle, AlertDescription, CloseButton,
         FormControl, FormLabel, FormHelperText, Input, Textarea, Button } from '@chakra-ui/react'
import { ArticleInfo, ArticleMeta } from '../../interfaces/article'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { route } from 'next/dist/server/router'

interface Props {
  article: ArticleInfo
}

interface AlertMessage {
  isVisible: boolean,
  status: AlertStatus,
  title: string,
  message: string
}

const baseUrl = ""

const ArticleForm: FC<Props> = () => {
  
  const router = useRouter()
  const { slug } = router.query;
  
  var article:ArticleInfo =  ({} as any) as ArticleInfo;

  var alertMissatgeBlank:AlertMessage = ( {isVisible: false, status: 'info', title: '', message: ''}) as AlertMessage

  const [formData, setFormData] = useState(article)
  const [visible, setVisible] = useState(false)
  const [alert, setAlert] = useState(alertMissatgeBlank)

  useEffect(() => {
    if (slug) {
      const url = baseUrl + `/api/articles/${slug}`
      fetch( url )
      .then(res => res.json())
      .then((data) => {
        setFormData(data)
        setVisible(true)
      })
      .catch(error => console.error(error))
    }
  },[slug])
  
  const showMessage = (status: AlertStatus, title: string, message: string) => {
    setAlert({isVisible: true, status, title, message})
  }
  const hiddenMessage= () => {
    setAlert({isVisible: false, status: 'info', title:'',  message:''})
  }

  const handleForm = (e: any): void => {
    var art:ArticleInfo = { ...formData }
    var meta:ArticleMeta = { ...formData.meta}
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

  const updateForm = (): void => {
    // Prepare object to update

    const data = {
      ...formData
    }
    const url = baseUrl + `/api/articles/update`
    fetch(url, {
      method: 'POST', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((data) => {
      if (data.ok) {
        const mess = (slug === formData.meta.slug) 
          ? "S'ha actualitzat correctament el registre."
          : "S'ha canviat el nom del registre i si no hi havia cap amb aquest nom, s'ha creat un nou registre."
        showMessage("success", "Registre guardat", mess)
      } else {
        showMessage("error", "Error no esperat!", JSON.stringify(data))
        console.log(data)
      }
    })
    .catch(error => {
      console.error(error)
      showMessage("error", "Error no esperat!", error.toString())
    })
  }

  return (
      <Box mt={[10, 0]}>
      <SimpleGrid
        display={{ base: "initial", md: "grid" }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
      >
      { (alert.isVisible) && (
      <Alert status={alert.status}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{alert.title}</AlertTitle>
        <AlertDescription display="block">
          {alert.message}
        </AlertDescription>
      </Box>
      <CloseButton position="absolute" right="8px" top="8px" onClick={hiddenMessage}/>
    </Alert>
      )}
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
                      rows={20}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: "sm" }}
                      value={formData.content}
                      onChange={handleForm}
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
              textAlign="right"
            >
              <Button 
               colorScheme="purple"
               _focus={{ shadow: "" }}
               fontWeight="md"
               onClick={updateForm}
               >
                Update
              </Button>
            </Box>
          </chakra.form>
        </GridItem>
      </SimpleGrid>

    </Box>
  )
  }

  export default ArticleForm;