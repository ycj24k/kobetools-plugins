import { createRouter, createWebHistory } from 'vue-router';
import config from './run-config.json';

let routes = [];
if (process.env.VUE_APP_ABC) {
    routes = [
        {
            path: process.env.VUE_APP_ABC,
            component: () => import(`@/views${process.env.VUE_APP_ABC}/Index.vue`),
        },
    ];
} else {
    function generateRoutes(route, parentPath = '') {
        const routes = [];
        const currentPath = `${parentPath}/${route.name}`;
        if (route.children) {
            route.children.forEach((child) => {
                routes.push(...generateRoutes(child, currentPath));
            });
        } else {
            routes.push({
                path: currentPath,
                component: () => import(`@/views${currentPath}/Index.vue`),
            });
        }
        return routes;
    }
    routes = generateRoutes(config.routes);
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
