import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/domain/record-keeping-info',
        component: () => import(`@/views/webmaster-tools/seo-check/domain/record-keeping-info/Index.vue`),
    },
    {
        path: '/domain/register-info',
        component: () => import(`@/views/webmaster-tools/seo-check/domain/register-info/Index.vue`),
    },
    {
        path: '/domain/domain-security',
        component: () => import(`@/views/webmaster-tools/seo-check/domain/domain-security/Index.vue`),
    },
    {
        path: '/domain/domain-complex',
        component: () => import(`@/views/webmaster-tools/seo-check/domain/domain-complex/Index.vue`),
    },
    {
        path: '/domain/website-tdk',
        component: () => import(`@/views/webmaster-tools/seo-check/domain/website-tdk/Index.vue`),
    },
    {
        path: '/website/ip-website',
        component: () => import(`@/views/webmaster-tools/seo-check/website/ip-website/Index.vue`),
    },
    {
        path: '/website/word-library',
        component: () => import(`@/views/webmaster-tools/seo-check/website/word-library/Index.vue`),
    },
    {
        path: '/website/weight-website',
        component: () => import(`@/views/webmaster-tools/seo-check/website/weight-website/Index.vue`),
    },
    {
        path: '/website/collect-website',
        component: () => import(`@/views/webmaster-tools/seo-check/website/collect-website/Index.vue`),
    },
    {
        path: '/website/outer-link',
        component: () => import(`@/views/webmaster-tools/seo-check/website/outer-link/Index.vue`),
    },
];

const baseRouter = "/plugins/webmaster-tools/seo-check";

routes.forEach(route => {
        route.path = baseRouter + route.path
    }
)

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
