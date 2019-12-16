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
                path: 'showUserDetail',
                component: () => import('@/modules/um/components/showUserDetail.vue'),
            },
            {
                path: 'showRoles',
                component: () => import('@/modules/um/components/showRoles.vue'),
            },
            {
                path: 'showRoleDetail',
                component: () => import('@/modules/um/components/showRoleDetail.vue'),
            },
            {
                path: 'showModules',
                component: () => import('@/modules/um/components/showModules.vue'),
            },
            {
                path: 'editUser',
                component: () => import('@/modules/um/components/editUser.vue'),
            },
        ],
    }
];
