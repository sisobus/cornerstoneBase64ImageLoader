import cornerstoneBase64ImageLoader from '../src/cornerstone-base64-image-loader'
import * as cornerstone from 'cornerstone-core'
import mask from '../src/base64Mask'

describe('createImage', () => {
  it('should return cornerstoneImageObject', () => {
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone
    const img = new Image()
    const imageId = `base64://${mask}`
    const r = cornerstoneBase64ImageLoader.imageLoader.createImage(img, imageId)
    expect(r).toHaveProperty('imageId')
  })
})
