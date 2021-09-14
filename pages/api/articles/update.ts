// Quick test
// curl "http://localhost:3000/api/articles/update" -d "article=$(curl -s 'http://localhost:3000/api/articles/first-content')"

import type { NextApiRequest, NextApiResponse } from 'next'
import Ghdb from '../../../lib/Ghdb'
import matter from 'gray-matter'
import { ArticleInfo } from '../../../interfaces/article'

type Return = {
  ok: string
} | {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Return>
) {

    // POST method
    if (req.method !== 'POST') {
        res.statusCode = 401
        res.json({error:"This method only accept POST call."})
        return
    }

    if (!req.body) {
        res.statusCode = 401
        res.json({error:"Article parameter is not defined."})
        return       
    }

    var matterObject, filename
    const params = req.body
    try {
        const article: ArticleInfo = params
        filename = "/" + article.meta.slug + ".mdx"
        delete article.meta.slug

        matterObject = matter.stringify(
                article.content,
                article.meta
        )
    } catch (e) {
        res.statusCode = 401
        console.log(e)
        res.json({error:"object parameter is not json."})
        return
    }
    

    
/*   No probat encarà!!!
*/    
     const ghdb = new Ghdb({ 
        personalAccessToken: process.env.ACCESSTOKEN, 
        owner: process.env.GH_USER, 
        repo: process.env.GH_REPOSITORY, 
        path: process.env.GH_PATH,
        branch: process.env.GH_BRANCH 
    })

   const result = await ghdb.lowWriteGithub(filename, matterObject )

   // const result = JSON.stringify(matterObject)
    
    res.status(200).json({ ok: result })
}