export function getStrapiURL() {
    return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  }





export async function fetcher(url,options={}){
    let response;
    if(!options){
        response= await fetch(url);
    }else{
        response= await fetch(url,options);
    }
   const data=response;
   return data;
}

export async function fetchData(url,authToken){
const headers={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${authToken},`
        },
    };
    
    try {
      const response=await fetch(url,authToken?headers:{}) 
      const data=response.json();
      if(!response.ok)throw new Error('Failed to fetch data');
      return data;
    } catch (error) {
        console.log('Error fetching data',error);
        throw error;
    }
}