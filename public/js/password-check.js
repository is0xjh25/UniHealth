var check = function() {
    if (document.getElementById('password').value ==
      document.getElementById('password-confirm').value) {
      document.getElementById('warning').style.color = 'green'
      document.getElementById('warning').innerHTML = 'password matching'
      document.getElementsByClassName('submit')[0].disabled = false
    } else {
      document.getElementById('warning').style.color = 'red'
      document.getElementById('warning').innerHTML = 'password not matching'
      document.getElementsByClassName('submit')[0].disabled = true
    }
}