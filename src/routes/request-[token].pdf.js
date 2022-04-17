import https from "https";

import * as crypto  from "crypto";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
let options = {
    method: 'GET',agent: httpsAgent,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic c3VwcG9ydDpjMHYxZDIwMjA='
    },
  };
export async function get({params,url}){

    const data = await fetch(`https://safemauritius.govmu.org/fhirservice/ServiceRequest?_revinclude=Task:based-on&identifier=${params.token}`,options)
    const tr = await data.json()
    if(data.ok){
        let pax = JSON.parse(tr.entry[1].resource.description)
         delete pax['finalized']
       // string to be hashed
       const str = JSON.stringify(pax)


       // create a sha-256 hasher
       const sha256Hasher = crypto.createHash("sha256");

       // hash the string
       // and set the output format
       const hash = sha256Hasher.update(str).digest("hex").toUpperCase();
       let fileOptions = {
        method: 'GET',agent: httpsAgent,
        headers: {
          Authorization: `${hash}`
        },
      };
        const getFile = await fetch(`https://safemauritius.govmu.org/api/summary/${params.token}`,fileOptions)
        
        if(getFile.ok){       
                return {
                    status: await getFile.status,   headers: {        
                      'content-type': 'text/Uint8Array'
                  },
                    body: await getFile.blob()
                } }

    }
    
}