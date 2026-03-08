document.getElementById("login-btn").addEventListener("click", function(){
    // console.log("Login button clicked");
    const usernameInput = document.getElementById("input-username");
    const userName = usernameInput.value;
    console.log(userName);

    const passwordInput = document.getElementById("input-password");
    const password = passwordInput.value;
    console.log(password);

    if(userName == "admin" && password == "admin123"){
        // alert("Login successfully");

        window.location.assign("dashboard.html");
    }
    else{
        alert("Invalid username or password");
        return;
    }
})