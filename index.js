/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ScreenNavigation from './screens/index';
import Login from './components/profile/Login';
AppRegistry.registerComponent(appName, () => ScreenNavigation);
