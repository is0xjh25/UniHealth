function switch_role(p){
        var desktop = document.getElementById("desktop-login");
        desktop.style.display="none";
        var desktop_role = document.getElementById("desktop-login-role");
        desktop_role.style.display = "block";
        if (p === "Staff"){
                desktop_role.querySelectorAll("h3")[0].innerText="Staff";
        }else{
                desktop_role.querySelectorAll("h3")[0].innerText="Patient";
        }
};



function back_to_home_s(){
        var desktop = document.getElementById("desktop-login");
        desktop.style.display="block"
        var desktop_staff = document.getElementById("desktop-login-role");
        desktop_staff.style.display = "none"
};

