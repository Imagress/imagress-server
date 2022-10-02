// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Sharp from 'sharp'
import { convert, FileFormat } from '../../libs/sharp'
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
  if (req.method === 'POST') {
    const output = await convert(req.body)
    res.status(200).json({ status: 'success', output })
  } else {
    res.status(200).json({ name: 'Flip' })
  }
}
