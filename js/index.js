document.addEventListener("DOMContentLoaded",addSubmitForm)
//document.addEventListener("DOMContentLoaded", createLoadButton)

let currentPage = 1 //to dictate the current page to load to

function addSubmitForm(e){
    const formContainer = document.getElementById('create-monster')
    const form = document.createElement('form')
    form.innerHTML = `
        <input type = name placeholder="name" >  </input>
        <input type = age placeholder="age"  >  </input>
        <input type = description placeholder="description" >  </input>
        <input type = "submit" value="Create Monster">  </input>
    `
    form.addEventListener("submit", addNewMonster)
    formContainer.appendChild(form)
}

// function createLoadButton(e){
//     setTimeout(()=>{
//         const monsterContainer = document.getElementById("monster-container")
//         const loadBtn = document.createElement("button")
//         loadBtn.innerText = "Load Monsters"
//         console.log(monsterContainer)
//         console.log(loadBtn)
//         monsterContainer.appendChild(loadBtn)
//         loadBtn.addEventListener("click",renderMonsters)
//     },1000)
// }
function clearCurrentMonsters(){
    const currentMonsters = document.querySelectorAll("#monster-container>div")
    currentMonsters.forEach(monster=>{
        monster.remove()
    })
}

function renderNextMonsters(e){
    currentPage++
    console.log(currentPage)
    clearCurrentMonsters()
    renderMonsters()
}

function renderPreviousMonsters(e){
    if(currentPage>1){
        currentPage --
        console.log(currentPage)
        clearCurrentMonsters()
        renderMonsters()
    }
}


function renderMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(resp=>resp.json())
    .then(monsters=>monsters.forEach(monster=>appendMonster(monster)))
    console.log(currentPage)
}

function appendMonster(monsterObj){
    const container = document.getElementById('monster-container')
    const monster = document.createElement('div')
    monster.innerHTML = `
        <h2> ${monsterObj.name} </h2>
        <p> ${monsterObj.age} </p>
        <p> ${monsterObj.description} </P>
    `
    container.appendChild(monster)
}

function addNewMonster(e){
    e.preventDefault()
    const inputMonster = document.querySelectorAll("input")
    console.log(inputMonster[0].value)
    console.log(inputMonster[1].value)
    console.log(inputMonster[2].value)
    fetch('http://localhost:3000/monsters',{
        method: "POST",
        headers: {"Content-Type": "application/json"
        },
        body: JSON.stringify({
            'name': `${inputMonster[0].value}`,
            'age': parseInt((inputMonster[1]).value,10),
            'description': `${inputMonster[2].value}`
        }),
    })
    .then(resp=>resp.json())
    .then(monsterData=>console.log(monsterData))
}

const backBtn = document.getElementById("back")
const forwardBtn = document.getElementById("forward")

backBtn.addEventListener("click",renderPreviousMonsters)
forwardBtn.addEventListener("click",renderNextMonsters)

renderMonsters()


//User defer to have all html accesseable in js at beginning of code
//put addEventListeners on back and forward btns
//in callbacks put or link fetch requests and adjust the pageNUmber accordinly - adjust the page properly too
//clear previous elements from DOM when doing the new fetch request
//clear own made btn