import { AppRegistry } from 'react-native';
import App from './App'; // Assuming App.js is where your main component is defined
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
