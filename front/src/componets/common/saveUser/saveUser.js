
const saveUserInDb = async (url, user) => {

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) 
      });
      const data = await response.json();
    } 
    
    catch (error) {
      return error;
      }
  };
  
  
  export default saveUserInDb