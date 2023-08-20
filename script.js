const button  = document.getElementById("button");
const ipspan = document.getElementById("ip");


$.get("https://ipinfo.io/json?token=79eb5576a5cc3a", function(response) {
           
            ipspan.innerHTML=`${response.ip}`
        }, "json")
         
button.addEventListener("click",()=>{
    // console.log("clicked");
    sessionStorage.setItem("ipaddress",ipspan.textContent);
    window.location.href="full.html";

});

