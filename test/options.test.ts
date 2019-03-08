import cornerstoneBase64ImageLoader from '../src/cornerstone-base64-image-loader'
import * as cornerstone from 'cornerstone-core'

describe('cornerstoneBase64ImageLoader options test', () => {
  it('default options', () => {
    expect(cornerstoneBase64ImageLoader.options).toEqual({
      channel: 4,
      width: null,
      height: null,
      schema: 'base64://'
    })
  })
  it('set options 1', () => {
    cornerstoneBase64ImageLoader.initOptions()
    cornerstoneBase64ImageLoader.options = {
      channel: 3,
      schema: 'test://'
    }
    expect(cornerstoneBase64ImageLoader.options).toEqual({
      channel: 3,
      width: null,
      height: null,
      schema: 'test://'
    })
  })
  it('set options 2', () => {
    cornerstoneBase64ImageLoader.initOptions()
    cornerstoneBase64ImageLoader.options = {
      channel: 1,
      width: 256,
      height: 256,
      schema: 'base64://'
    }
    expect(cornerstoneBase64ImageLoader.options).toEqual({
      channel: 1,
      width: 256,
      height: 256,
      schema: 'base64://'
    })
  })
  it('check options reference or copy', () => {
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone
    cornerstoneBase64ImageLoader.initOptions()
    cornerstoneBase64ImageLoader.options = {
      channel: 1,
      width: 256,
      height: 256,
      schema: 'base64://'
    }
    expect(cornerstoneBase64ImageLoader.imageLoader.options).toEqual({
      channel: 1,
      width: 256,
      height: 256,
      schema: 'base64://'
    })
  })
})
