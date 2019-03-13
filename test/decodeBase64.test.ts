import cornerstoneBase64ImageLoader from '../src/cornerstone-base64-image-loader'
import * as cornerstone from 'cornerstone-core'
import mask from '../src/base64Mask'

describe('decodeBase64', () => {
  it('should return decoded base64 image promise', () => {
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone
    const arrayBuffer = cornerstoneBase64ImageLoader.imageLoader.decodeBase64(mask)
    expect(arrayBuffer.length).toBeGreaterThan(0)
  })
})
