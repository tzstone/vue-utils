export default [
  {
    path: '/',
    component: () => import('@/components/empty.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/examples/home.vue'),
      },
    ],
  },
];
