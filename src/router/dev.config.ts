/* eslint-disable */
import { RouteConfig } from 'vue-router';


import icon from './modules/icon';

import theme from './modules/theme';

let routesConfig: Array<RouteConfig> = [];
  routesConfig = [
    
      ...icon,
    
      ...theme,
    
  ]

export default routesConfig;