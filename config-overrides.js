/* config-overrides.js */

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.modulesDirectories = ['src', 'node_modules'];
  console.log('REWIRED');
  console.log('config', config);
  console.log('env', env);
  console.log('--------');
  
  return config;
};