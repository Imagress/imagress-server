import { ConvertInput, FileFormat } from './type'
import Sharp from 'sharp'

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

  const { flip, rotate, resize } = input

  if (flip) {
    if (flip.x) {
      image = image.flop()
    }
    if (flip.y) {
      image = image.flip()
    }
  }

  if (rotate) {
    image = image.rotate(rotate.angle)
  }

  if (resize) {
    image = image.resize(resize.width, resize.height, {
      fit: resize.fit,
    })
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
