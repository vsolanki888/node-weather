console.log('client side js added')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(search.value);
    const location = search.value;
    messageOne.textContent = 'Loading.........'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then(response => {
        response.json().then((data) => {
            console.log(data);
            if(data.status == 'error'){
                messageOne.textContent = data.message
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})