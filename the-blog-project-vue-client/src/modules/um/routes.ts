export default [
    {
        path: '/um',
        components: {
            default: () => import('@/modules/um/components/_main.vue'),
            subnav: () => import('@/modules/um/components/_navigation.vue')
        },
        children: [
            {
                path: '',
                component: () => import('@/modules/um/components/index.vue'),
            },
            {
                path: 'showUsers',
                component: () => import('@/modules/um/components/showUsers.vue'),
            },
            {
                path: 'showRoles',
                component: () => import('@/modules/um/components/showRoles.vue'),
            },
            {
                path: 'showPermissions',
                component: () => import('@/modules/um/components/showPermissions.vue'),
            },
        ],
    }
];
