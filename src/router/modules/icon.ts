export default [
  {
    path: '/',
    component: () => import('@/components/empty.vue'),
    children: [
      {
        path: '/icon',
        name: 'icon',
        component: () => import('@/examples/icon.vue'),
      },
    ],
  },
];
