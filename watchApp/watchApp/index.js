// index.js-ում ավելացրեք global error handler:
import {AppRegistry} from 'react-native';
import App from './App';

console.log('🔧 Index.js loaded successfully');

global.ErrorUtils.setGlobalHandler((error) => {
  console.log('🚨 Global error:', error);
});

try {
  console.log('🔧 About to register component...');
  AppRegistry.registerComponent('watchApp', () => App);
  console.log('🔧 Component registered successfully!');
} catch (error) {
  console.log('❌ Registration failed:', error);
}