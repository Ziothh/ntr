export * from './next';
export * from './types';


import { unzip } from 'zlib';
import { routers } from './next'

// const appRouter = routers.appRouter.useRouter();
// const pagesRouter = routers.pagesRouter.useRouter();

// appRouter.push('/user/[userId]/[orderId]', {
//   params: {
//     orderId: '',
//     userId: '',
//   }
// })
// appRouter.push('/app-router/optional/[[...optional]]', {
//   params: {
//     optional: undefined
//   }
// })
// appRouter.push('/app-router/required/[...required]', {
//   params: {
//     required: ['']
//   }
// })
//
// appRouter.push('/pages-router/optional/[[...optional]]/page', {
//   params: {
//     required: ['']
//   }
// })
// pagesRouter.push({
//   path: '/orders/[userId]/[orderId]',
//   params: {
//     userId: '',
//     orderId: ''
//   }
// })
// pagesRouter.push({
//   path: '/pages-router/optional/[[...optional]]/page'
// })
// pagesRouter.push({
//   path: '/api/auth/[...nextauth]',
//   params: {
//     nextauth: ['']
//   }
// })
