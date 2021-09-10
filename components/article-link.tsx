/* Use https://github.com/anubra266/choc-ui */
import { FunctionComponent } from "react";
import { ArticleInfo } from "../interfaces/article";
import { Box, Link, Image, Flex, useColorModeValue, chakra } from '@chakra-ui/react'

interface IProps {
    article: ArticleInfo;
}

const Cards: FunctionComponent<IProps> = ({article}) => {
    return (
      <Flex
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="md"
          mx="auto"
          py={4}
          px={8}
          bg={useColorModeValue("white", "gray.800")}
          shadow="lg"
          rounded="lg"
        >
          <Flex justifyContent={{ base: "center", md: "end" }} mt={-16}>
            <Image
              w={20}
              h={20}
              fit="cover"
              rounded="full"
              borderStyle="solid"
              borderWidth={2}
              borderColor={useColorModeValue("brand.500", "brand.400")}
              alt={article.meta.title}
              src={article.meta.thumbnail}
            />
          </Flex>
  
          <chakra.h2
            color={useColorModeValue("gray.800", "white")}
            fontSize={{ base: "2xl", md: "3xl" }}
            mt={{ base: 2, md: 0 }}
            fontWeight="bold"
          >
            {article.meta.title}
          </chakra.h2>
  
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.200")}>
            {article.meta.description}
          </chakra.p>
  
        </Box>
      </Flex>
    );
  };

const ArticleLink: FunctionComponent<IProps> = ({ article }) => {
    return ( 
        <Link href={`/article/${article.meta.slug}`}>
            <Cards article={article} />
        </Link>
    )
}
  
export default ArticleLink