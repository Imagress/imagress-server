import { FileFormat } from './FileFormat'
import { ResizeFit } from './Resize'

export type ConvertInput = {
  image: string
  rotate?: { angle: number }
  flip?: { x?: boolean; y?: boolean }
  sharpen?: {
    options?: {
      sigma: number
      m1?: number
      m2?: number
      x1?: number
      y2?: number
      y3?: number
    }
  }
  median?: {
    size?: number
  }
  blur?: {
    sigma?: number
  }
  flatten?: {
    options?: { background: string }
  }
  negate?: {
    options?: {
      alpha: boolean
    }
  }
  normalise?: boolean
  format?: FileFormat
  resize?: {
    width?: number
    height?: number
    fit?: ResizeFit
  }
  tint?: {
    rgb?: string | Object
  }
  greyscale?: boolean
}
