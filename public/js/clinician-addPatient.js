function validate() {

    var pwd1 = document.getElementById("password").value;

    var pwd2 = document.getElementById("pass-confirm").value;

    if(pwd1 == pwd2){
        document.getElementById("warning").innerHTML="<font color='red'>Password need to be same</font>";
     }

}