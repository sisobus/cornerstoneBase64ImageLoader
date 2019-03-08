import cornerstoneBase64ImageLoader from '../src/cornerstone-base64-image-loader'
import * as cornerstone from 'cornerstone-core'

describe('getArrayBuffer test', () => {
  it('should return ', () => {
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone
    const arrayBuffer = cornerstoneBase64ImageLoader.imageLoader.getArrayBuffer('TESTSTRING')
    expect(arrayBuffer).toEqual(new Uint8Array([84, 69, 83, 84, 83, 84, 82, 73, 78, 71]))
  })
})
