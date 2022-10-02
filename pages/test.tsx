import React, { useRef, useState } from 'react'

export default function Test() {
  const [inputImage, setInputImage] = useState<string | ArrayBuffer | null>()
  const [outputImage, setOutputImage] = useState<string | null>()
  const [flipX, setFlipX] = useState(false)
  const [flipY, setFlipY] = useState(false)
  return (
    <div>
      <div>Test Image Uploader</div>
      <input
        type={'file'}
        onChange={async e => {
          console.log(e.target.files)
          const file = e.target?.files?.[0]
          if (file) {
            const buffer = await convertBase64(file)
            console.log(buffer)
            setInputImage(buffer)
          }
        }}
      />
      <input type="checkbox" checked={flipX} onChange={e => setFlipX(!flipX)} />
      <label>Flip X</label>

      <input type="checkbox" checked={flipY} onChange={e => setFlipY(!flipY)} />
      <label>Flip Y</label>
      <button
        onClick={async () => {
          console.log(flipX)

          const response = await fetch('http://localhost:3000/convert', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: inputImage,
              flip: {
                x: flipX,
                y: flipY,
              },
            }),
          })

          const output = await response.json()
          console.log(output)
          setOutputImage(
            `data:image/${output.output.format};base64,${output.output.image}`
          )
        }}
      >
        upload
      </button>
      <p>
        {inputImage && <img src={inputImage as string} />}
        {outputImage && <img src={outputImage} />}
      </p>
    </div>
  )
}

function convertBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = error => {
      reject(error)
    }
  })
}
