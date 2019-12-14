export default [
    {
        path: '/blog',
        components: {
            default: () => import('@/modules/blogs/components/_main.vue'),
            subnav: () => import('@/modules/blogs/components/_navigation.vue')
        },
        children: [
            {
                path: '',
                component: () =>
                    import('@/modules/blogs/components/index.vue'),
            },
            {
                path: 'posts',
                component: () =>
                    import('@/modules/blogs/components/index.vue'),
            },
            {
                path: 'editPost',
                component: () =>
                    import('@/modules/blogs/components/post.editPost.vue'),
            },
            {
                path: 'showPostDetail',
                component: () =>
                    import('@/modules/blogs/components/post.showPostDetail.vue'),
            }
        ]
    },
];
