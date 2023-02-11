export default async function ({ store, $axios, redirect }) {
  const auth = await $axios.$get('/auth')

  if(!!auth.error) return

  store.commit('auth/set', auth.result)
}