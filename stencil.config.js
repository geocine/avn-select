const { sass } = require('@stencil/sass');

exports.config = {
  namespace: 'avn-select',
  outputTargets:[
    { 
      type: 'dist' 
    },
    { 
      type: 'www',
      serviceWorker: false
    }
  ],
  plugins: [
    sass()
  ]
};
