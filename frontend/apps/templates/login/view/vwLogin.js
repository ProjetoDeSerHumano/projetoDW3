


async function vwLogin() {
  const form = document.getElementById("formLogin");
  const formData = new FormData(form);

  if (!Validar(formData)) {
    return false;
  } else {
    //const passwordCrypto = CryptoJS.MD5(formData.get('Password')).toString();
    //formData.set('Password', passwordCrypto); 

    const payload = {
      UserName: formData.get('UserName'),
      Password: formData.get('Password')
    };

    resp = await axios.post('/Login', payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch(error => {        
        alert('Error:' + error.response.data.msg);
        // Handle any errors
        return;
      });

    console.log("Valor RESP:" + JSON.stringify(resp))  ;
    if (!resp) {
      return;
    }
    

    Cookies.set('isLogged', true, { sameSite: 'strict' });   
    window.open("/", "_self");
  }
}