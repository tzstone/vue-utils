/* eslint-disable */
import { RouteConfig } from 'vue-router';


import home from './modules/home';

import icon from './modules/icon';

import theme from './modules/theme';

let routesConfig: Array<RouteConfig> = [];
  routesConfig = [
    
      ...home,
    
      ...icon,
    
      ...theme,
    
  ]

export default routesConfig;