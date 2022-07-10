var form = document.querySelector('#form')

form.addEventListener('submit', async (event) =>
{
    event.preventDefault();
    let cityName = document.getElementById('cityName').value;
    let victimSex = document.getElementById('victimSex').value;
    let vicitimAge = document.getElementById('vicitimAge').value;
    let victimRace = document.getElementById('victimRace').value;
    let victimEthnicity = document.getElementById('victimEthnicity').value;


        var myHeaders = new Headers();

        var myInit = {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'cors',
            cache: 'default'
        };

        await fetch(`http://172.16.191.211:3000/murder/victim/insert?cityName=${cityName}&victemSex=${victimSex}&victimAge=${vicitimAge}&victimRace=${victimRace}&victimEthnicity=${victimEthnicity}`, myInit).then(function (response)
        {
            if (response.status == 200)
            {
                alert('Vitima inserida com sucesso');
            } else
            {
                alert('erro ao inserir vitima');

            }
        })

        location.reload();

    


})