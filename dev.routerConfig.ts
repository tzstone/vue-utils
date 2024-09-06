/* eslint-disable */
import { RouteConfig } from 'vue-router';


import home from './src/router/modules/home';

import theme from './src/router/modules/theme';

let routesConfig: Array<RouteConfig> = [];
  routesConfig = [
    
      ...home,
    
      ...theme,
    
  ]

export default routesConfig;