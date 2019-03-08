import * as UPNG from 'upng-js'

class CornerstoneBase64ImageLoader {
  cornerstone: any
  channel: number

  constructor(cornerstone: any, channel: number = 4) {
    this.cornerstone = cornerstone
    this.channel = channel
  }
  registerLoaders() {
    console.log('register')
  }
}

const _defaultOptions: any = {
  channel: 4,
  width: null,
  height: null,
  schema: 'base64'
}
let _imageLoader: CornerstoneBase64ImageLoader
let _options: any = { ..._defaultOptions }
const cornerstoneBase64ImageLoader = {
  external: {
    set cornerstone(cs: any) {
      _imageLoader = new CornerstoneBase64ImageLoader(cs)

      _imageLoader.registerLoaders()
    },
    get cornerstone() {
      return _imageLoader.cornerstone
    }
  },
  initOptions: (): void => {
    _options = { ..._defaultOptions }
  },
  set options(newOptions: any) {
    _options = { ..._options, ...newOptions }
  },
  get options() {
    return { ..._options }
  }
}
export default cornerstoneBase64ImageLoader
