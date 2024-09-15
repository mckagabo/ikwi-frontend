// Function to get the Strapi URL, defaulting to localhost if no env variable is set.
export function getStrapiURL() {
    return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  }
  
  // General fetcher function with optional options parameter.
  export async function fetcher(url, options = {}) {
    let response;
  
    // Check if options are provided, then use fetch accordingly.
    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }
  
    // Assuming you wanted to parse the response as JSON.
    const data = await response.json(); // Await the JSON response here
    return data;
  }
  
  // Function to fetch data from a given URL, optionally with an authorization token.
  export async function fetchData(url, authToken = null) {
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if authToken is provided.
        ...(authToken && { Authorization: `Bearer ${authToken}` }) // Remove the comma after the token.
      },
    };
  
    try {
      // Perform the fetch request, including headers only if authToken is present.
      const response = await fetch(url, headers);
  
      // Parse the response as JSON.
      const data = await response.json();
  
      // Throw an error if the response is not OK.
      if (!response.ok) throw new Error('Failed to fetch data');
  
      return data;
    } catch (error) {
      console.log('Error fetching data:', error);
      throw error;
    }
  }
  