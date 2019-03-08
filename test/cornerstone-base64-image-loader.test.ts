import cornerstoneBase64ImageLoader from '../src/cornerstone-base64-image-loader'
import * as cornerstone from 'cornerstone-core'

/**
 * Dummy test
 */
describe('cornerstoneBase64ImageLoader test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('cornerstone of imageLoader equals to cornerstone-core', () => {
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone
    expect(cornerstoneBase64ImageLoader.external.cornerstone).toEqual(cornerstone)
  })
})
