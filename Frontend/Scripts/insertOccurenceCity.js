var form = document.querySelector('#form')

form.addEventListener('submit', async (event) =>
{
    event.preventDefault();
    let cityName = document.getElementById('cityName').value;


    var myInit = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        mode: 'cors',
        cache: 'default'
    };

    await fetch(`http://172.16.191.211:3000/crime/occurence/insert/city?city=${cityName}`, myInit).then(function (response)
    {
        if (response.status == 200)
        {
            alert('Cidade inserida com sucesso');
        } else
        {
            alert('erro ao inserir ciadade');

        }
    })

    location.reload();




})