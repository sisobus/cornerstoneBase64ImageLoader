import cornerstoneBase64ImageLoader from '../src/cornerstone-base64-image-loader'
import * as cornerstone from 'cornerstone-core'
import mask from '../src/base64Mask'
const UPNG = require('upng-js')

describe('replaceImage', () => {
  it('should return imagePromise', () => {
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone
    cornerstoneBase64ImageLoader.external.UPNG = UPNG
    const layer = {
      image: {
        columns: 1760,
        rows: 1760
      }
    }
    const arrayBuffer = cornerstoneBase64ImageLoader.imageLoader.decodeBase64(mask)
    const promise = cornerstoneBase64ImageLoader.imageLoader.replaceImage(layer, arrayBuffer)
    if (promise) {
      expect(promise).toHaveProperty('then')
    } else {
      expect(promise).toBeNull()
    }
  })
})
