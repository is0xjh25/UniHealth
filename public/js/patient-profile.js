
var modal = document.getElementById('myModal')


var btn = document.getElementById('rpBtn')
var signout = document.getElementById('outBtn')

signout.addEventListener('click', async (_) => {
    console.log('try')
    const response = await fetch('/logout', {
        method: 'post',
    })
    window.location.href = '/login'
    console.log('Completed!', response)
})


var span = document.getElementsByClassName('close')[0]


var btn2 = document.getElementById('commentCon')


var btn3 = document.getElementById('commentDis')


btn.onclick = function () {
    modal.style.display = 'block'
}



btn3.onclick = function () {
    modal.style.display = 'none'
}


span.onclick = function () {
    modal.style.display = 'none'
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}
