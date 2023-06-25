
const sendPurchase = async (url, cart, radioValue, email, authToken) => {
    
  try {
    let items = cart.map(item => {
      return{
        description: email,
        quantity: item.quantity,
        id: item.id,
        category_id: radioValue, //address
      }
    })
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({items}) 
    });
    const data = await response.json();
    return data.init_point;
  } 
  
  catch (error) {
    console.log(error)
  }
};


export default sendPurchase