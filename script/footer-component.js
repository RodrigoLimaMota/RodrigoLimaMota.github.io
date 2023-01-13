const footer = document.querySelector('[data-js="footer"]')

const present = new Date().getTime()
const past = new Date('Nov 17 2022 16:20').getTime()

const diference = present-  past 

const diferenceInSeconds = Math.round(diference/1000)
const diferenceInMinutes = Math.round(diferenceInSeconds/60)
const diferenceInHours = Math.round(diferenceInMinutes/60)
const diferenceInDays = Math.round(diferenceInHours/24)

footer.innerHTML = `<p>O site está em construção. Atualizado há ${diferenceInDays} dias.</p>`
