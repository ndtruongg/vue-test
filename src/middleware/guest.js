export default function guest({ next, store, router }) {
  if (store.getters.auth || localStorage.getItem('local')) {
    return router.push({ name: 'dashboard' })
  }

  return next()
}
