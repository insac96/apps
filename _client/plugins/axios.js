export default function ({ $axios, store }) {
  $axios.onResponse(response => {
    // Auth Error
    if(response.status == 401){

    }
    // Server Error
    else if(response.status == 503){

    }
  })
}