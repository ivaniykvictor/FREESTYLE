(function(){
    const menuActiveElement = document.getElementById('menuActive');
  
    const adaptiveMenu = document.getElementById('adaptiveMenu');
    adaptiveMenu.addEventListener('click', function() {
        menuActiveElement.classList.add("active");
    });

    const menuClose = document.getElementById('menuClose');
    menuClose.addEventListener('click', function() {
        menuActiveElement.classList.remove("active");
    });

    const menuForma = document.getElementById('forma')

    const button = document.getElementById('button');
    button.addEventListener('click', function() {
        menuForma.classList.add("active-forma");
    });

    const formaMenuClose = document.getElementById('formaClose');
    formaMenuClose.addEventListener('click', function() {
        menuForma.classList.remove("active-forma");
    });

    const formaSeeYou = document.getElementById('formaSeeYou');
     
    const buttonOk = document.getElementById('buttonSeeYou');
    buttonOk.addEventListener('click', function() {
        formaSeeYou.classList.remove("active-forma")
    });

    

    const accessToken = '1283516768:AAHFFHTdc2bOsk0iM6ffemPmqOyCPO4VaCI';
    const chatId = '-1001167248578';

   

    document.getElementById('contactsForma').addEventListener('submit', async event => { event.preventDefault();
   
        const email = document.getElementById('inputEmail4').value;
        const phone = document.getElementById('inputText4').value;
        const name = document.getElementById('inputName').value;
        const address = document.getElementById('inputAddress2').value;
        const work = document.getElementById('inputWhereWork').value;
        const hobby = document.getElementById('inputHobby').value;
    
        const message = `Email: ${email}\nPhone: ${phone}\nName: ${name}\nAddress: ${address}\nWork: ${work}\nProfession: ${hobby}`;


        let res;
        try { res = await fetch(`https://api.telegram.org/bot${accessToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
        res = await res.json();

        if (res.ok) {
            menuForma.classList.remove("active-forma");
            formaSeeYou.classList.add("active-forma");
        } else {
            throw res.description;
        }
        } catch (err) {
            console.error('Message was not sent');
        }
    }); 
})();