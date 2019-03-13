import cornerstoneBase64ImageLoader from '../src/cornerstone-base64-image-loader'
import * as cornerstone from 'cornerstone-core'
import mask from '../src/base64Mask'

describe('testing imageLoader', () => {
  it('should return decoded base64 image promise', () => {
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone
    const imageId = `base64://${mask}`
    const { promise } = cornerstoneBase64ImageLoader.imageLoader.imageLoader(imageId)
    expect(promise).toHaveProperty('then')
  })
})
