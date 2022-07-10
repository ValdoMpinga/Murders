const prepertatorTable = document.querySelector('.prepertatorTable');
const deletePrepertatorData = document.querySelector('.delete');

async function injectPrepetators()
{
    if(localStorage.getItem("logedUserEmail")==null)
    window.location.href = `./index.html`

    const data = await fetch('http://172.16.191.211:3000/crime/prepertrator/get/crime/prepertrators');
    const jsonData = await data.json();

    for(let i=0;i<100;i++)
    {
        let row = prepertatorTable.insertRow(0);

        let cell1 = row.insertCell(0);
        cell1.innerHTML =  jsonData[i]._id;

        let cell2 = row.insertCell(1);
        cell2.innerHTML =  jsonData[i].perpetratorSex;

        let cell3 = row.insertCell(2);
        cell3.innerHTML =  jsonData[i].age;

        let cell4 = row.insertCell(3);
        cell4.innerHTML =  jsonData[i].perpetratorRace;

        let cell5 = row.insertCell(4);
        cell5.innerHTML =  jsonData[i].perpetratorEthnicity;

        let cell6 = row.insertCell(5);
        cell6.innerHTML =  jsonData[i].relationship;

        let cell7 = row.insertCell(6);
        cell7.innerHTML =  jsonData[i].weapon;


        // let cell8 = row.insertCell(7);
        // cell8.innerHTML += "<a href='#' class='delete' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE5C9;</i></a>";
    }


    if (localStorage.getItem("role") == 'view')
    {
        document.querySelector('.btn').hidden=true;
        document.querySelector('.options').hidden=true;
        const elements=document.querySelectorAll('.delete').forEach((element)=>
            {
                element.hidden=true;
            })

    } 
//     jsonData.forEach(element =>
//     {
//         let row = prepertatorTable.insertRow(0);

//         let cell1 = row.insertCell(0);
//         cell1.innerHTML = element._id;

//         let cell2 = row.insertCell(1);
//         cell2.innerHTML = element.perpetratorSex;

//         let cell3 = row.insertCell(2);
//         cell3.innerHTML = element.age;

//         let cell4 = row.insertCell(3);
//         cell4.innerHTML = element.perpetratorEthnicity;

//         let cell5 = row.insertCell(4);
//         cell5.innerHTML = element.relationship;

//         let cell6 = row.insertCell(5);
//         cell6.innerHTML = element.weapon;

//         let cell7 = row.insertCell(6);
//         cell7.innerHTML += "<a href='#' class='delete' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE5C9;</i></a>";

//         // cell6.innerHTML += "<a href='#' class='settings' title='Settings' data-toggle='tooltip'><i class='material-icons'>&#xE8B8;</i></a>";
//         // cell3.innerHTML += "<a href='#' class='delete' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE5C9;</i></a>";
//  });

}


prepertatorTable.addEventListener('click', async (e) =>
{
    const confirmation=confirm("Certeza que deseja apagar este usuario?")
    if(confirmation==true)
    {
        const btn = e.target;
        const table = btn.closest('tr')
        const line = table.getElementsByTagName("td");
        const email = line[1].outerText;
        btn.closest('tr').remove();
        
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
                alert('success!!!');
            else
                alert('A migração ja foi feita!')
            
        })
    
        location.reload();
    }
   
});

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

async function eliminatePrepetators()
{
    const confirmation = confirm("Certeza que deseja apagar todos os assassinos?")
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

}