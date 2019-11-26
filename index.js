
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import weatherMenu from './src/screens/weatherMenu'
import teste from './src/screens/teste'
import Navigator from './src/Navigator'

// AppRegistry.registerComponent(appName, () => weatherMenu);
// AppRegistry.registerComponent(appName, () => teste);

AppRegistry.registerComponent(appName, () => Navigator);
