const victimsTable = document.querySelector('.victimsTable');
const deleteVictimButton = document.querySelector('.delete');

async function injectVictims()
{
    if (localStorage.getItem("logedUserEmail") == null)
        window.location.href = `./index.html`
    if (localStorage.getItem("role") == 'view')
    {
        document.querySelectorAll('.btn').forEach((element) =>
        {
            element.hidden = true;
        })
        document.querySelector('.options').hidden = true;
    }

    const data = await fetch('http://172.16.191.211:3000/murder/victim/get');
    const jsonData = await data.json();

    for (let i = 0; i < 100; i++)
    {
        let row = victimsTable.insertRow(0);

        let cell1 = row.insertCell(0);
        cell1.innerHTML = jsonData[i]._id;

        let cell2 = row.insertCell(1);
        cell2.innerHTML = jsonData[i].cityId;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = jsonData[i].victemSex;

        let cell4 = row.insertCell(3);
        cell4.innerHTML = jsonData[i].victimAge;

        let cell5 = row.insertCell(4);
        cell5.innerHTML = jsonData[i].victimRace;

        let cell6 = row.insertCell(5);
        cell6.innerHTML = jsonData[i].victimEthnicity;

        let cell7 = row.insertCell(6);
        cell7.innerHTML += "<a href='#' class='delete' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE5C9;</i></a>";
    }


    document.querySelectorAll('.delete').forEach((element) =>
    {
        element.hidden = true;
    })


    // jsonData.forEach(element =>
    // {
    //     let row = victimsTable.insertRow(0);

    //     let cell1 = row.insertCell(0);
    //     cell1.innerHTML = element._id;

    //     let cell2 = row.insertCell(1);
    //     cell2.innerHTML = element.cityId;

    //     let cell3 = row.insertCell(2);
    //     cell3.innerHTML = element.victemSex;

    //     let cell4 = row.insertCell(3);
    //     cell4.innerHTML = element.victimAge;

    //     let cell5 = row.insertCell(4);
    //     cell5.innerHTML = element.victimRace;

    //     let cell6 = row.insertCell(5);
    //     cell6.innerHTML = element.victimEthnicity;

    //     let cell7 = row.insertCell(6);
    //     cell7.innerHTML += "<a href='#' class='delete' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE5C9;</i></a>";


    //     // cell6.innerHTML += "<a href='#' class='settings' title='Settings' data-toggle='tooltip'><i class='material-icons'>&#xE8B8;</i></a>";
    //     // cell3.innerHTML += "<a href='#' class='delete' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE5C9;</i></a>";
    // });

}


victimsTable.addEventListener('click', async (e) =>
{
    const confirmation = confirm("Certeza que deseja apagar esta vitima")
    if (confirmation == true)
    {
        const btn = e.target;
        const table = btn.closest('tr')
        const line = table.getElementsByTagName("td");
        const userId = line[0].outerText;
        btn.closest('tr').remove();

        var myHeaders = new Headers();

        var myInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'cors',
            cache: 'default'
        };

        await fetch(`http://172.16.191.211:3000/murder/victim/delete/one?userId=${userId}`, myInit).then(function (response)
        {
            if (response.status == 200)
                alert('success!!!');
            else
                alert('Erro ao eliminar o user')

        })

        location.reload();
    }

});

async function migrateVictims()
{

    var myHeaders = new Headers();

    var myInit = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        mode: 'cors',
        cache: 'default'
    };

    await fetch(`http://172.16.191.211:3000/murder/victim/migration`, myInit).then(function (response)
    {
        if (response.status == 200)
        {
            alert('success!!!');
        } else
            alert('erro na migração')
    })

    location.reload();
}

document.querySelector('#deleteCities').addEventListener('click', async function deleteVictims() 
{
    const confirmation = confirm("Certeza que deseja apagar todas as vitimas?")
    if (confirmation == true)
    {

        var myHeaders = new Headers();

        var myInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'cors',
            cache: 'default'
        };

        await fetch(`http://172.16.191.211:3000/murder/victim/delete/all`, myInit).then(function (response)
        {
            if (response.status == 200)
                alert('success!!!');
            else
                alert('Erro ao apagar cidades')

        })

        location.reload();
    }

})
