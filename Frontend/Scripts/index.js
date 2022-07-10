var form = document.querySelector('#form')

form.addEventListener('submit', async (event) =>
{
    event.preventDefault();

    localStorage.removeItem('token')
    let email = document.getElementById('userName').value;
    let password = document.getElementById('pwd').value;


    var myHeaders = new Headers();

    var myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    await fetch(`http://172.16.191.211:3000/user/login?email=${email}&password=${password}`, myInit).then(response => response.text().then((json) =>
    {
        if (response.status != 200)
            alert('email ou palavra passe errada');
        else
        {

            let token = JSON.parse(json);
            localStorage.setItem('token', token.token)
            localStorage.setItem('logedUserEmail',email)
            window.location.href = `./home.html`
        }

    }


    ))
    // console.log( response.text())
    // console.log('oi')
    // if (response.status == 200)
    // {
    //     localStorage.clear();
    //     console.log(response)
    //     //  window.location.href = `./home.html?email=${email}`;
    // } else
    // {
    //     alert('email ou palavra passe errada');

    // }

})