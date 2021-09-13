// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Ghdb from '../../../lib/Ghdb'
import matter from 'gray-matter'
import { ArticleInfo } from '../../../interfaces/article';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleInfo>
) {
    const slug =  Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug

    const ghdb = new Ghdb({ 
        personalAccessToken: process.env.ACCESSTOKEN, 
        owner: process.env.GH_USER, 
        repo: process.env.GH_REPOSITORY, 
        path: process.env.GH_PATH,
        branch: process.env.GH_BRANCH 
    })

    const fileRaw = await ghdb.lowReadGithub("/"+slug+".mdx")
    const result = matter(fileRaw?.content!)
    const article = {
        meta: {
            ...result.data,
            slug
        },
        content: result.content
    } as ArticleInfo

    res.status(200).json(article)
}
