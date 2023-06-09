document.querySelector('#contactSubmit')
.addEventListener('click',function () {
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
    addContact(nameInput.value, phoneInput.value, emailInput.value);
    ;
})

function addContact(name, phone, email){
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