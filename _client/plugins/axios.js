export default function ({ $axios, store }) {
  $axios.onResponse(response => {
    const data = response.data

    if(!data.error) return
    if(data.status == 200) return

    // Auth Error
    if(data.status == 401){
      store.commit('dialog/openSign')
    }
    // Other Error
    else {
      store.commit('dialog/openError', data)
    }
  })
}