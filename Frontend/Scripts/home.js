const userTable = document.querySelector('.userTable');
const deleteButton = document.querySelector('.delete');

async function logout()
{
    const confirmation = confirm("Certeza que deseja sair?")
    if (confirmation == true)
    {
        localStorage.removeItem('token');
        localStorage.removeItem('logedUserEmail');
        window.location.href = '../HTML/index.html';
    }


}

async function getRole()
{
    var myHeaders = new Headers();

    var init = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };


    let status=0;

    await fetch(`http://172.16.191.211:3000/user/get/role?email=${localStorage.getItem("logedUserEmail")}`, init).then((response) =>
    {
        status=response.status
        
     
    })

    return status
}

async function injectUsers()
{
    if(localStorage.getItem("logedUserEmail")==null)
    window.location.href = `./index.html`


    console.log(localStorage.getItem('token'))
    let role = await getRole();


    
    if (role==200)
    {
        localStorage.setItem("role","view");

        document.querySelector('.table-wrapper').hidden=true;
        let welcomeImage=document.createElement('img')
        welcomeImage.style.width="800px";
        welcomeImage.style.margin="auto";
        welcomeImage.style.display="block";
        welcomeImage.src="../Assets/welcome.jpeg";
        document.querySelector('.container').appendChild(welcomeImage)
    }
    else if (role ==201)
    {
        localStorage.setItem("role","edit");

       
        document.querySelector('.table-wrapper').hidden=true;
        let welcomeImage=document.createElement('img')
        welcomeImage.style.width="800px";
        welcomeImage.style.margin="auto";
        welcomeImage.style.display="block";
        welcomeImage.src="../Assets/welcome.jpeg";
        document.querySelector('.container').appendChild(welcomeImage)
    }
    else if (role == 202)
    {
        localStorage.setItem("role","admin");

        const data = await fetch('http://172.16.191.211:3000/user/get/all');


    const jsonData = await data.json();

    
    jsonData.forEach(element =>
    {
        let row = userTable.insertRow(0);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = element._id;

        let cell2 = row.insertCell(1);
        cell2.innerHTML = element.firstName;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = element.lastName;

        let cell4 = row.insertCell(3);
        cell4.innerHTML = element.email;

        let cell5 = row.insertCell(4);
        cell5.innerHTML = element.role;

        let cell6 = row.insertCell(5);

        cell6.innerHTML += "<a href='#' class='delete' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE5C9;</i></a>";
    });

  

    }

    console.log(localStorage.getItem("role"))
}



userTable.addEventListener('click', async (e) =>
{
    const confirmation = confirm("Certeza que deseja apagar este usuario?")
    if (confirmation == true)
    {
        const btn = e.target;
        const table = btn.closest('tr')
        const line = table.getElementsByTagName("td");
        const email = line[3].outerText;
        btn.closest('tr').remove();
  
        // var myHeaders = new Headers();

        var myInit = {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'cors',
            cache: 'default'
        };

        await fetch(`http://172.16.191.211:3000/user/delete?email=${email}`, myInit).then(function (response)
        {
            if (response.status == 200)
            {
                alert('success!!!');
            }
        })

        location.reload();
    }
});

