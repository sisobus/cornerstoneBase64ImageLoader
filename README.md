# cornerstone Base64 Image Loader
[![Build Status](https://travis-ci.org/sisobus/cornerstoneBase64ImageLoader.svg?branch=master)](https://travis-ci.org/sisobus/cornerstoneBase64ImageLoader) [![codecov](https://codecov.io/gh/sisobus/cornerstoneBase64ImageLoader/branch/master/graph/badge.svg)](https://codecov.io/gh/sisobus/cornerstoneBase64ImageLoader)

A library of [Cornerstone](https://github.com/cornerstonejs/cornerstone) Image Loader for Web Images (PNG, JPEG) encoded base64.


## Live Examples

[Chest X-ray image with mask png image encoded base64](https://examples.sisobus.com/cornerstone-base64-image-loader/)


## Install

* Package Manager

```sh
$ yarn add cornerstone-base64-image-loader
(or)
$ npm install cornerstone-base64-image-loader
```

* Release
  * [cornerstone-base64-image-loader.es5.js](https://github.com/sisobus/cornerstoneBase64ImageLoader/releases/download/0.0.1/cornerstone-base64-image-loader.es5.js)
  * [cornerstone-base64-image-loader.es5.js.map](https://github.com/sisobus/cornerstoneBase64ImageLoader/releases/download/0.0.1/cornerstone-base64-image-loader.es5.js.map)
  * [cornerstone-base64-image-loader.umd.js](https://github.com/sisobus/cornerstoneBase64ImageLoader/releases/download/0.0.1/cornerstone-base64-image-loader.umd.js)
  * [cornerstone-base64-image-loader.umd.js.map](https://github.com/sisobus/cornerstoneBase64ImageLoader/releases/download/0.0.1/cornerstone-base64-image-loader.umd.js.map)

## Usage

Simply include the cornerstone-base64-image-loader.umd.js in your HTML file after you load cornerstone.js and then set the cornerstone instance as an external module for cornerstoneBase64ImageLoader:

```javascript
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneBase64ImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer
cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
const wadoconfig = {
  webWorkerPath: 'https://api.sisobus.com/share/cornerstoneWADOImageLoaderWebWorker.js',
  taskConfiguration: {
    decodeTask: {
      codecsPath: 'https://api.sisobus.com/share/cornerstoneWADOImageLoaderCodecs.js'
    }
  }
}
cornerstoneWADOImageLoader.webWorkerManager.initialize(wadoconfig)

const element = document.getElementById('cornerstone-element');
const renderer = new cornerstoneTools.stackRenderers.FusionRenderer()
renderer.findImageFn = function (imageIds) {
  return imageIds[0]
}
const imageId = `wadouri:${uris.dicomUri}`;
const dicomStack = {
  imageIds: [imageId],
  currentImageIdIndex: 0,
  options: {
    opacity: 1,
    visible: true,
    name: 'base'
  }
};

cornerstone.enable(element);
cornerstone.loadImage(imageId).then(image => {
  cornerstone.displayImage(element, image);
  cornerstoneTools.addStackStateManager(element, ['stack']);
  cornerstoneTools.addToolState(element, 'stack', dicomStack);
  cornerstoneTools.addToolState(element, 'stackRenderer', renderer);
  const promise = renderer.render(element);

  cornerstoneTools.mouseInput.enable(element);
  cornerstoneTools.mouseWheelInput.enable(element);
  cornerstoneTools.eraser.enable(element);
  cornerstoneTools.wwwc.activate(element, 1);
  cornerstoneTools.pan.activate(element, 2);
  cornerstoneTools.zoom.activate(element, 4);
  cornerstoneTools.zoomWheel.activate(element);

  cornerstoneTools.touchInput.enable(element);
  cornerstoneTools.panTouchDrag.activate(element);
  cornerstoneTools.zoomTouchPinch.activate(element);

  return promise;
}).then(() => {
  const enabledElement = cornerstone.getEnabledElement(element)
  const maskImageId = `base64://${uris.base64Mask}`;
  const maskStack = {
    imageIds: [maskImageId],
    currentImageIdIndex: 0,
    options: {
      opacity: 0.9,
      visible: true,
      viewport: {
        translation: enabledElement.viewport.translation,
        scale: enabledElement.viewport.scale
      },
      name: 'nodule'
    }
  };
  cornerstoneTools.addToolState(element, 'stack', maskStack);
  renderer.render(element).then(() => {
    cornerstone.updateImage(element);
    const layers = cornerstone.getLayers(element)
    for (let i = 1; i < layers.length; i = i + 1) {
      if (layers[i].viewport.scale !== layers[0].viewport.scale) {
        layers[i].viewport.scale = layers[0].viewport.scale
      }
    }
  });
});

```
