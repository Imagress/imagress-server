// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Sharp from "sharp";
type Data = {
  name?: string;
  status?: string;
  output?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    console.log(req.body.image);
    
    // const content = await JSON.parse(req.body);
    const buffer = Buffer.from((req.body.image as string).replace('data:image/png;base64,',''), "base64");
    const imageBuffer = await Sharp(buffer).flip(true).jpeg().toBuffer();
    const output = imageBuffer.toString("base64");
    res.status(200).json({ status: "success", output });
  } else {
    res.status(200).json({ name: "Flip" });
  }
}
