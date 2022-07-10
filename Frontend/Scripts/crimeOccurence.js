const citiesTable = document.querySelector('.cityTable');
const deleteCityButton = document.querySelector('.delete');

async function injectCities()
{
    if(localStorage.getItem("logedUserEmail")==null)
  {  window.location.href = `./index.html`}

    if (localStorage.getItem("role") == 'view')
    {
        document.querySelectorAll('.btn').forEach((element) =>
        {
            element.hidden = true;
        })

    } 


        const data = await fetch('http://172.16.191.211:3000/crime/occurence/get/cities');
        const jsonData = await data.json();

        jsonData.forEach(element =>
        {
            let row = citiesTable.insertRow(0);

            let cell1 = row.insertCell(0);
            cell1.innerHTML = element._id;

            let cell2 = row.insertCell(1);
            cell2.innerHTML = element.city;



            // cell6.innerHTML += "<a href='#' class='settings' title='Settings' data-toggle='tooltip'><i class='material-icons'>&#xE8B8;</i></a>";
            // cell3.innerHTML += "<a href='#' class='delete' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE5C9;</i></a>";
        });
    

}

document.querySelector('#deleteCities').addEventListener('click', async function deleteCities() 
{
    const confirmation = confirm("Certeza que deseja apagar todas as cidades?")
    if (confirmation == true)
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

        await fetch(`http://172.16.191.211:3000/crime/occurence/delete/collection`, myInit).then(function (response)
        {
            if (response.status == 200)
                alert('success!!!');
            else
                alert('Erro ao apagar cidades')

        })

        location.reload();
    }

})


async function migrateCities()
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

    await fetch(`http://172.16.191.211:3000/crime/occurence/migration`, myInit).then(function (response)
    {
        if (response.status == 200)
        {
            alert('success!!!');
        }
    })

    location.reload();
}
