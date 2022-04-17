// https://fhir.integrated.ml/hs/api/rest/srch/%2529cc4a39-8cb5-4baa-8a80-fbffc8c38538%25
import https from "https";

let host = import.meta.env.VITE_HOST
let authGOC= import.meta.env.VITE_GOC
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
let options = {
    method: 'GET',
    
  headers: {
    Authorization: `Basic ${authGOC}`
  },
  };
export async function get({params}){
  let searchValue = (params.value).replaceAll(' ','%25')
    const data = await fetch(`${host}/api/rest/srch/%25${searchValue}%25`,options)

    return {
        status:  data.status,
        body: await data.json()
    } 
}