console.log('yes this is js')




const formData = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')


formData.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if(data.err){
                p1.textContent = data.err
                p2.textContent = ''

            }
            else{                
                p1.textContent = data.location
                p2.textContent = data.forecast
            }
        })
    })
})