import home from './modules/home';
import icon from './modules/icon';
import theme from './modules/theme';

const routes = [...home, ...icon, ...theme];
console.log('routes', routes);
export default routes;
