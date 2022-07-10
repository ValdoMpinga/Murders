var form = document.querySelector('#form')

form.addEventListener('submit', async (event) =>
{
    event.preventDefault();
    let firstName = document.getElementById('fName').value;
    let lastName = document.getElementById('lName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('pwd1').value;
    let passwordConfirm = document.getElementById('pwd2').value;
   
    if (password != passwordConfirm)
    {
        alert('As palavras passes devem ser iguaus!')
    } else
    {

        var myHeaders = new Headers();

        var myInit = {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'cors',
            cache: 'default'
        };
        // 172.16.191.211:3000/user/insert?firstName=Apagado&lastName=Ganancio&email=aapaga@gmail.com&password=comedor&role=admin
        await fetch(`http://172.16.191.211:3000/user/insert?firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}`, myInit).then(function (response)
        {
            console.log(response);
            if (response.status == 200)
            {
                alert('sucesso');
            } else
            {
                alert('erro ao inserir usuario');

            }
        })

        location.reload();

    }


})