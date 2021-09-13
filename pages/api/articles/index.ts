// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Ghdb from '../../../lib/Ghdb'
import matter from 'gray-matter'


type Articles = string[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Articles>
) {

    const ghdb = new Ghdb({ 
        personalAccessToken: process.env.ACCESSTOKEN, 
        owner: process.env.GH_USER, 
        repo: process.env.GH_REPOSITORY, 
        path: process.env.GH_PATH,
        branch: process.env.GH_BRANCH 
    })

    const result = await ghdb.lowReadDirGithub("")
    var ret = []

    if (result) {
      ret = result.map(({type, ...item})  => {
        return item.path.replace(/\.mdx$/g,"")
      })
    }

  res.status(200).json(ret)
}
