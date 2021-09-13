// /pages/posts/[slug].tsx

import { FC, Fragment } from "react";
import { GetStaticPaths } from "next";
import fs from 'fs';
import { ArticleInfo } from "../../interfaces/article";
import matter from "gray-matter"
import ArticleCard from "../../components/article-card";

const contentDirectory = "contents"

interface Props {
    article: ArticleInfo;
}

const Article: FC<Props> = ({ article }: Props) => {
    return (
            <ArticleCard article={article} />
    );
};

export async function getStaticProps({ ...ctx }) {
    const { slug } = ctx.params;

    const content = fs
        .readFileSync(`${contentDirectory}/${slug}.mdx`)
        .toString();

    const info = matter(content);

    const article = {
        meta: {
            ...info.data,
            slug
        },
        content: info.content
    }

    return {
        props: {
            article: article
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
        const files = fs.readdirSync(contentDirectory);
        const paths = files.map(file => ({
            params: {
                slug: file.split('.')[0]
            }
        }))
        
        return {
            paths,
            fallback: false,
        }
    }
    

export default Article;