const urlBase = '/LAMPAPI';
const extension = 'php';

let userId = -1;
let firstName = "";
let lastName = "";

function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    document.getElementById("loginResult").innerHTML = "";

    let tmp = {login:login,password:password};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse( xhr.responseText );
                userId = jsonObject.id;

                if( userId < 1 )
                {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "home.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }

}

function doSignup() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;

    let username = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    console.log(firstName + ", " + lastName + ", " + username + ", " + password + ", " )

    // if (!validSignUpForm(firstName, lastName, username, password)) {
    //     document.getElementById("signupResult").innerHTML = "invalid signup";
    //     return;
    // }

    document.getElementById("signupResult").innerHTML = ""; 

    let tmp = {
        firstName: firstName,
        lastName: lastName,
        login: username,
        password: password
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SignUp.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {

            if (this.readyState != 4) {
                return;
            }

            if (this.status == 409) {
                document.getElementById("signupResult").innerHTML = "User already exists"; 
                return;
            }

            if (this.status == 200) {

                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                document.getElementById("signupResult").innerHTML = "User added"; 
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                saveCookie();
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("signupResult").innerHTML = err.message; 
    }
}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++)
    {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if( tokens[0] == "firstName" )
        {
            firstName = tokens[1];
        }
        else if( tokens[0] == "lastName" )
        {
            lastName = tokens[1];
        }
        else if( tokens[0] == "userId" )
        {
            userId = parseInt( tokens[1].trim() );
        }
    }

    if( userId < 0 )
    {
        window.location.href = "index.html";
    }
    else
    {

    }
}

function doLogout()
{
    userId = -1;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}


function addContact(){

    const nameInput = document.querySelector('#nameInput');
    const phoneInput = document.querySelector('#phoneInput');
    const emailInput = document.querySelector('#emailInput');
    const error_msg = document.querySelector('#error_msg');
    let messages = []
    error_msg.innerText = '';
    if(nameInput.value === '' || nameInput == null){
        messages.push('Name is required');
    }
    if(phoneInput.value === '' || phoneInput == null){
        messages.push('Phone is required');
    }
    if(emailInput.value === '' || emailInput == null){
        messages.push('Email is required');
    }
    if(messages.length > 0){
        error_msg.innerText = messages.join('\n');
        return;
    }
    messages = []

    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;

    if(!name || !name.trim()) return;
    if(!phone || !phone.trim()) return;
    if(!email || !email.trim()) return;

    //Add the contact to the api
    addContactApi(name, phone, email);
    
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact';

    const contactInfo = document.createElement('div');
    contactInfo.className = 'contact-info'

    const imageDiv = document.createElement('div');
    imageDiv.className = 'prof-icon';
    const profImg = document.createElement('i');
    imageDiv.append(profImg);
    profImg.className = 'fa-solid fa-user';

    const editDiv = document.createElement('button');
    editDiv.className = 'contact-edit';
    const editImg = document.createElement('i');
    editDiv.append(editImg);
    editImg.className = 'fa-solid fa-pen-to-square';
    editDiv.id = 'edit';
    
    const deleteDiv = document.createElement('button');
    deleteDiv.className = 'contact-delete';
    const deleteImg = document.createElement('i');
    deleteDiv.append(deleteImg);
    deleteImg.className = 'fa-solid fa-trash';

    const nameDiv = document.createElement('p');
    nameDiv.className = 'name';
    nameDiv.textContent = name;
    nameDiv.contentEditable = 'false';

    const phoneDiv = document.createElement('p');
    phoneDiv.className = 'phone';
    phoneDiv.textContent = phone;
    phoneDiv.contentEditable = 'false';

    const emailDiv = document.createElement('p');
    emailDiv.className = 'email';
    emailDiv.textContent = email;
    emailDiv.contentEditable = 'false';
    


    contactDiv.append(imageDiv);
    contactDiv.append(contactInfo);
    contactDiv.append(editDiv);
    contactDiv.append(deleteDiv);

    contactInfo.append(nameDiv);
    contactInfo.append(phoneDiv);
    contactInfo.append(emailDiv);
    
    

    document.querySelector('.contact-list').append(contactDiv);
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";

    editDiv.addEventListener('click', () => {
        if(editDiv.id == 'edit'){
            editImg.className = 'fa-solid fa-floppy-disk fa-beat-fade';
            nameDiv.contentEditable = 'true';
            emailDiv.contentEditable = 'true';
            phoneDiv.contentEditable = 'true';
            nameDiv.focus();
            editDiv.id = 'save';
        }
        else{
            editImg.className = 'fa-solid fa-pen-to-square';
            nameDiv.contentEditable = 'false';
            emailDiv.contentEditable = 'false';
            phoneDiv.contentEditable = 'false';
            editDiv.id = 'edit';
        }
        
    });

    deleteDiv.addEventListener('click' , () => {
        document.querySelector('.contact-list').removeChild(contactDiv);
    });
}

function addContactApi(name, phoneNum, email) {

    let tmp = {
        name: name,
        phone: phoneNum,
        email: email,
        userId: userId
    };

    let jsonPayload = JSON.stringify(tmp);


    let url = '/LAMPAPI/AddContact.php';


    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            }
        };

        xhr.send(jsonPayload);


    } catch (err) {
    }
}

function GetContact(contactId) {

    let tmp = {
        contactId: contactId,
        userId: userId
    };

    let jsonPayload = JSON.stringify(tmp);


    let url = '/LAMPAPI/GetContact.php';


    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let jsonObject = JSON.parse( xhr.responseText );

            }
        };

        xhr.send(jsonPayload);


    } catch (err) {
    }
}

function loadContacts(){

    let tmp = {
        name: "",
        userId: userId
    };

    let jsonPayload = JSON.stringify(tmp);


    let url = urlBase + '/SearchContact.' + extension;


    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let jsonObject = JSON.parse( xhr.responseText );
                if(jsonObject.error){
                    console.log(jsonObject.error);
                    return;
                }

                results = jsonObject.results
                for (let i = 0; i < results.length; i++) {
                    let contactId = results[i]
                    let contact = {}
                    getContact(contactId, function(result) {
                    if (result) {
                        contact = result
                        console.log(result);
                    } else {
                        console.log("An error occurred while getting the contact.");
                    }
                    });
                      

                    let name = contact.Name;
                    let phone = contact.Phone;
                    let email = contact.Email;

                    if(!name || !name.trim()) return;
                    if(!phone || !phone.trim()) return;
                    if(!email || !email.trim()) return;

                    const contactDiv = document.createElement('div');
                    contactDiv.className = 'contact';

                    const contactInfo = document.createElement('div');
                    contactInfo.className = 'contact-info'

                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'prof-icon';
                    const profImg = document.createElement('i');
                    imageDiv.append(profImg);
                    profImg.className = 'fa-solid fa-user';

                    const editDiv = document.createElement('button');
                    editDiv.className = 'contact-edit';
                    const editImg = document.createElement('i');
                    editDiv.append(editImg);
                    editImg.className = 'fa-solid fa-pen-to-square';
                    editDiv.id = 'edit';
                    
                    const deleteDiv = document.createElement('button');
                    deleteDiv.className = 'contact-delete';
                    const deleteImg = document.createElement('i');
                    deleteDiv.append(deleteImg);
                    deleteImg.className = 'fa-solid fa-trash';

                    const nameDiv = document.createElement('p');
                    nameDiv.className = 'name';
                    nameDiv.textContent = name;
                    nameDiv.contentEditable = 'false';

                    const phoneDiv = document.createElement('p');
                    phoneDiv.className = 'phone';
                    phoneDiv.textContent = phone;
                    phoneDiv.contentEditable = 'false';

                    const emailDiv = document.createElement('p');
                    emailDiv.className = 'email';
                    emailDiv.textContent = email;
                    emailDiv.contentEditable = 'false';

                    contactDiv.append(imageDiv);
                    contactDiv.append(contactInfo);
                    contactDiv.append(editDiv);
                    contactDiv.append(deleteDiv);
                
                    contactInfo.append(nameDiv);
                    contactInfo.append(phoneDiv);
                    contactInfo.append(emailDiv);

                    document.querySelector('.contact-list').append(contactDiv);

                    editDiv.addEventListener('click', () => {
                        if(editDiv.id == 'edit'){
                            editImg.className = 'fa-solid fa-floppy-disk fa-beat-fade';
                            nameDiv.contentEditable = 'true';
                            emailDiv.contentEditable = 'true';
                            phoneDiv.contentEditable = 'true';
                            nameDiv.focus();
                            editDiv.id = 'save';
                        }
                        else{
                            editImg.className = 'fa-solid fa-pen-to-square';
                            nameDiv.contentEditable = 'false';
                            emailDiv.contentEditable = 'false';
                            phoneDiv.contentEditable = 'false';
                            editDiv.id = 'edit';
                        }                        
                    });

                    deleteDiv.addEventListener('click' , () => {
                        document.querySelector('.contact-list').removeChild(contactDiv);
                    });
                }

            }
        };

        xhr.send(jsonPayload);


    } catch (err) {
        console.log(err.message)
    }
}

function getContact(contactId, callback) {
  let tmp = {
    userId: userId,
    contactId: contactId
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + '/GetContact.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsonObject = JSON.parse(xhr.responseText);
      if (jsonObject.error) {
        console.log(jsonObject.error);
        callback(null); // Pass null to indicate an error
      } else {
        callback(jsonObject); // Pass the result to the callback
      }
    }
  };

  xhr.send(jsonPayload);
}
