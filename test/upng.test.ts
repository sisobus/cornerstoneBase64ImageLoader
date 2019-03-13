import cornerstoneBase64ImageLoader from '../src/cornerstone-base64-image-loader'
import * as cornerstone from 'cornerstone-core'
const UPNG = require('upng-js')

describe('set UPNG external library', () => {
  it('should exactly equals to UPNG', () => {
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone
    cornerstoneBase64ImageLoader.external.UPNG = UPNG
    expect(cornerstoneBase64ImageLoader.external.UPNG).toEqual(UPNG)
  })
})
