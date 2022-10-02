import { ConvertInput, FileFormat } from './type'
import Sharp from 'sharp'
import { omit } from 'lodash'

export async function convert(input: ConvertInput) {
  const extractText = /data:image\/(.*);base64,.*/.exec(input.image)

  const inputFileFormat = (extractText?.[1] ?? 'jpeg') as FileFormat
  const outputFileFormat = input.format ?? inputFileFormat
  const buffer = Buffer.from(
    input.image.replace(/data:image\/(.*);base64,/, ''),
    'base64'
  )

  let image = await Sharp(buffer)
  image = format(image, outputFileFormat)

  if (input.flip) {
    if (input.flip.x) {
      image = image.flop()
    }
    if (input.flip.y) {
      image = image.flip()
    }
  }

  const imageBuffer = await image.toBuffer()
  return { image: imageBuffer.toString('base64'), format: outputFileFormat }
}

function format(image: Sharp.Sharp, fileFormat: FileFormat) {
  switch (fileFormat) {
    case 'gif':
      return image.gif()
    case 'jpeg':
      return image.jpeg()
    case 'png':
      return image.png()
    case 'tiff':
      return image.tiff()
    case 'webp':
      return image.webp()
    default:
      return image.jpeg()
  }
}
