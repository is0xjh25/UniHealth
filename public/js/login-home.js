function switch_role(p){
        var desktop = document.getElementById("desktop-login");
        desktop.style.display="none";
        var desktop_role = document.getElementById("desktop-login-role");
        desktop_role.style.display = "block";
        if (p === "Staff"){
                desktop_role.querySelectorAll("h3")[0].innerText="Staff";
                desktop_role.querySelectorAll("form")[0].action = "login-clinician";
        }else{
                desktop_role.querySelectorAll("h3")[0].innerText="Patient";
                desktop_role.querySelectorAll("form")[0].action = "login-patient";
        }
        console.log(desktop_role.querySelectorAll("form")[0].action);
};

function back_to_home_s(){
        var desktop = document.getElementById("desktop-login");
        desktop.style.display="block"
        var desktop_staff = document.getElementById("desktop-login-role");
        desktop_staff.style.display = "none"
};


function turn_dashbord(){
        var role = document.getElementById("desktop-login-role").querySelectorAll("h3")[0].innerText;
        console.log(role);
        if(role === "Staff"){
                // window.location.hearf = "clinician-dashboard.html";
                window.open("clinician-dashboard.html");
        }else{
                // window.location.hearf= "patient-dashboard.html";
                window.open("patient-dashboard.html");
        }
};
