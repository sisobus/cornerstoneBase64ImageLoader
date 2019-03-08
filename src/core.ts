import { _defaultOptions, Option } from './store'

export default class CornerstoneBase64ImageLoader {
  _UPNG: any
  _cornerstone: any
  _options: Option
  _lastImageIdDrawn: string | null
  _canvas: HTMLCanvasElement

  constructor(cornerstone: any, options: Option = _defaultOptions) {
    this._cornerstone = cornerstone
    this._options = options
    this._lastImageIdDrawn = null
    this._UPNG = null
    this._canvas = document.createElement('canvas')

    this.arrayBufferToImage = this.arrayBufferToImage.bind(this)
    this.getArrayBuffer = this.getArrayBuffer.bind(this)
    this.decodeBase64 = this.decodeBase64.bind(this)
    this.createImage = this.createImage.bind(this)
    this.imageLoader = this.imageLoader.bind(this)
    this.replaceImage = this.replaceImage.bind(this)
  }

  arrayBufferToImage(arrayBuffer: Uint8Array): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image: HTMLImageElement = new Image()
      const arrayBufferView: Uint8Array = new Uint8Array(arrayBuffer)
      const blob: Blob = new Blob([arrayBufferView])
      const urlCreator: URL = (window as any).URL || (window as any).webkitURL
      const imageUrl: string = (urlCreator as any).createObjectURL(blob)

      image.src = imageUrl
      image.onload = () => {
        ;(urlCreator as any).revokeObjectURL(imageUrl)
        resolve(image)
      }
      image.onerror = error => {
        ;(urlCreator as any).revokeObjectURL(imageUrl)
        reject(error)
      }
    })
  }
  getArrayBuffer(str: string): Uint8Array {
    const buf: ArrayBuffer = new ArrayBuffer(str.length)
    let bufView: Uint8Array = new Uint8Array(buf)

    Array.from(str).map((ch: string, idx: number) => {
      bufView[idx] = ch.charCodeAt(0)
      return ch
    })
    return bufView
  }
  decodeBase64(base64PixelData: string): Uint8Array {
    let pixelDataAsString: string = window.atob(base64PixelData)
    const arrayBuffer: Uint8Array = this.getArrayBuffer(pixelDataAsString)
    return arrayBuffer
  }
  createImage(image: HTMLImageElement, imageId: string): any {
    const rows: number = image.naturalHeight
    const columns: number = image.naturalWidth

    const getImageData = (): ImageData => {
      let context: CanvasRenderingContext2D

      if (this._lastImageIdDrawn === imageId) {
        context = this._canvas.getContext('2d') as CanvasRenderingContext2D
      } else {
        this._canvas.height = image.naturalHeight
        this._canvas.width = image.naturalWidth
        context = this._canvas.getContext('2d') as CanvasRenderingContext2D
        context.drawImage(image, 0, 0)
        this._lastImageIdDrawn = imageId
      }

      return context.getImageData(0, 0, image.naturalWidth, image.naturalHeight)
    }

    const getPixelData = (): Uint8ClampedArray => {
      const imageData = getImageData()

      return imageData.data
    }

    const getCanvas = (): HTMLCanvasElement => {
      if (this._lastImageIdDrawn === imageId) {
        return this._canvas
      }

      this._canvas.height = image.naturalHeight
      this._canvas.width = image.naturalWidth
      const context: CanvasRenderingContext2D = this._canvas.getContext(
        '2d'
      ) as CanvasRenderingContext2D

      context.drawImage(image, 0, 0)
      this._lastImageIdDrawn = imageId

      return this._canvas
    }
    const setLastImageIdDrawn = (nextLastImageIdDrawn: string | null = null): void => {
      this._lastImageIdDrawn = nextLastImageIdDrawn
    }

    return {
      imageId,
      minPixelValue: 0,
      maxPixelValue: 255,
      slope: 1,
      intercept: 0,
      windowCenter: 128,
      windowWidth: 255,
      render: this.cornerstone.renderWebImage,
      getPixelData,
      getCanvas,
      getImage: () => image,
      setLastImageIdDrawn,
      rows,
      columns,
      height: rows,
      width: columns,
      color: true,
      rgba: false,
      columnPixelSpacing: null,
      rowPixelSpacing: null,
      invert: false,
      sizeInBytes: rows * columns * this._options.channel
    }
  }

  imageLoader(imageId: string) {
    // const schema = imageId.split('://')[0]
    const base64PixelData: string = imageId.replace(this._options.schema, '')
    let arrayBuffer: Uint8Array
    if (this._options.width && this._options.height && this._UPNG) {
      const columns: number = this._options.width
      const rows: number = this._options.height
      arrayBuffer = new Uint8Array(columns * rows * this._options.channel)
      arrayBuffer = this._UPNG.encode([arrayBuffer.buffer], columns, rows, 0)
    } else {
      arrayBuffer = this.decodeBase64(base64PixelData)
    }
    const imagePromise: Promise<HTMLImageElement> = this.arrayBufferToImage(arrayBuffer)
    const promise: Promise<any> = new Promise((resolve, reject) => {
      imagePromise.then(image => {
        const imageObject: any = this.createImage(image, imageId)

        resolve(imageObject)
      }, reject)
    })

    return {
      promise
    }
  }

  replaceImage(layer: any, arrayBuffer: Uint8Array) {
    if (!this._UPNG) {
      return null
    }
    const png: any = this._UPNG.encode(
      [arrayBuffer.buffer],
      layer.image.columns,
      layer.image.rows,
      0
    )
    const imagePromise: Promise<HTMLImageElement> = this.arrayBufferToImage(png)
    return imagePromise.then(image => {
      layer.image = this.createImage(image, layer.image.imageId)
    })
  }

  get options(): Option {
    return { ...this._options }
  }
  get cornerstone(): any {
    return this._cornerstone
  }
  setUPNG(UPNG: any) {
    this._UPNG = UPNG
  }
  registerLoaders() {
    this.cornerstone.registerImageLoader('base64', this.imageLoader)
  }
}
