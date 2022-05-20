// 获取弹窗
var modal = document.getElementById('myModal')

// 打开弹窗的按钮对象
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

// 获取 <span> 元素，用于关闭弹窗 that closes the modal
var span = document.getElementsByClassName('close')[0]

//点击confirm弹窗
var btn2 = document.getElementById('commentCon')

//点击Discarf弹窗
var btn3 = document.getElementById('commentDis')

// 点击按钮打开弹窗
btn.onclick = function () {
    modal.style.display = 'block'
}

//  btn2.onclick = function(){
//      alert('Submit Successfully');
//  }

btn3.onclick = function () {
    modal.style.display = 'none'
}

// 点击 <span> (x), 关闭弹窗
span.onclick = function () {
    modal.style.display = 'none'
}

// 在用户点击其他地方时，关闭弹窗
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}
