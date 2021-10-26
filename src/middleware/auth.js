export default function auth({ next, router }) {
  if (!localStorage.getItem('local')) {
    return router.push({ name: 'login' })
  }

  return next()
}
