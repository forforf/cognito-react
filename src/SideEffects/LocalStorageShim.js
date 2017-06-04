//for testing in node
// Stupid jest/jsdom without localStorage
const localStorageMock = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };

})();

// this is a stupid hack that needs
// to be better thought out
// its only purpose is to hang localstorage off of it
// in a way that works in browser and node testing
const LocalStorageShim = {};

// For testing in node
if (typeof localStorage === 'undefined') {
  LocalStorageShim.localStorage = localStorageMock;
} else {
  LocalStorageShim.localStorage = localStorage;
}

export default LocalStorageShim.localStorage;