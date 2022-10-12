// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { convert, FileFormat } from '../../libs/sharp'
import NextCors from 'nextjs-cors'
type Data = {
  name?: string
  status?: string
  output?: {
    image: string
    format: FileFormat
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  if (req.method === 'POST') {
    const output = await convert(req.body)
    res.status(200).json({ status: 'success', output })
  } else {
    res.status(200).json({ name: 'Flip' })
  }
}
