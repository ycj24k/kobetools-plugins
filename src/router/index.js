import {createRouter, createWebHistory} from 'vue-router';

const baseRouter="/plugins/webmaster_tools";

const routes = [
    {
        path: baseRouter+'/record_keeping_info',
        name: 'record_keeping_info',
        component: () => import(`@/views/domain_name/record_keeping_info/Index.vue`),
    },
    {
        path: baseRouter+'/register_info',
        name: 'register_info',
        component: () => import(`@/views/domain_name/register_info/Index.vue`),
    },
    {
        path: baseRouter+'/domain_security',
        name: 'domain_security',
        component: () => import(`@/views/domain_name/domain_security/Index.vue`),
    },
    {
        path: baseRouter+'/domain_complex',
        name: 'domain_complex',
        component: () => import(`@/views/domain_name/domain_complex/Index.vue`),
    },
    {
        path: baseRouter+'/website_tdk',
        name: 'website_tdk',
        component: () => import(`@/views/domain_name/website_tdk/Index.vue`),
    },
    {
        path: baseRouter+'/ip_website',
        name: 'ip_website',
        component: () => import(`@/views/website/ip_website/Index.vue`),
    },
    {
        path: baseRouter+'/word_library',
        name: 'word_library',
        component: () => import(`@/views/website/word_library/Index.vue`),
    },
    {
        path: baseRouter+'/weight_website',
        name: 'weight_website',
        component: () => import(`@/views/website/weight_website/Index.vue`),
    },
    {
        path: baseRouter+'/collect_website',
        name: 'collect_website',
        component: () => import(`@/views/website/collect_website/Index.vue`),
    },
    {
        path: baseRouter+'/outer_link',
        name: 'outer_link',
        component: () => import(`@/views/website/outer_link/Index.vue`),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
