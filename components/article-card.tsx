import { FunctionComponent } from "react";
import { ArticleInfo } from "../interfaces/article";
import { Box, Link, Heading, Image, Flex, chakra, useColorModeValue } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'

interface IProps {
    article: ArticleInfo;
}

const Cards: FunctionComponent<IProps> = ({article}) => {
    return (
        <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          mx="auto"
          rounded="lg"
          shadow="md"
          bg={useColorModeValue("white", "gray.800")}
          maxW="2xl"
        >
          <Image
            roundedTop="lg"
            w="full"
            h={64}
            fit="cover"
            src={article.meta.thumbnail}
            alt={article.meta.title}
          />
  
          <Box p={6}>
            <Box>
              <chakra.span
                fontSize="xs"
                textTransform="uppercase"
                color={useColorModeValue("brand.600", "brand.400")}
              >
                {article.meta.creator}
              </chakra.span>
              <Link
                display="block"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                fontSize="2xl"
                mt={2}
                _hover={{ color: "gray.600", textDecor: "underline" }}
                
              >
                {article.meta.title}
              </Link>
              <chakra.p
                mt={2}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
            <ReactMarkdown components={ChakraUIRenderer()}>
                {article.content}
            </ReactMarkdown>
              </chakra.p>
            </Box>
  
          </Box>
        </Box>
      </Flex>
    );
}
const ArticleCard: FunctionComponent<IProps> = ({ article }) => {
    return (
        <Cards article={article} />
    )
}
export default ArticleCard