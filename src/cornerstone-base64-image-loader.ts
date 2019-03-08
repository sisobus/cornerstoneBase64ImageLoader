import CornerstoneBase64ImageLoader from './core'
import { _defaultOptions, Option } from './store'

let _imageLoader: CornerstoneBase64ImageLoader
let _options: Option = { ..._defaultOptions }
const cornerstoneBase64ImageLoader = {
  external: {
    set cornerstone(cs: any) {
      _imageLoader = new CornerstoneBase64ImageLoader(cs, _options)

      _imageLoader.registerLoaders()
    },
    get cornerstone() {
      return _imageLoader.cornerstone
    },
    set UPNG(_UPNG: any) {
      _imageLoader.setUPNG(_UPNG)
    }
  },
  initOptions: (): void => {
    _options = { ..._defaultOptions }
  },
  set options(newOptions: Option) {
    _options = { ..._options, ...newOptions }
  },
  get options() {
    return { ..._options }
  },
  get imageLoader(): CornerstoneBase64ImageLoader {
    return _imageLoader
  }
}
export default cornerstoneBase64ImageLoader
