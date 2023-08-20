 const ipaddress= sessionStorage.getItem("ipaddress");
 const ipadd = document.getElementById("ipaddress");
 ipadd.innerHTML=`${ipaddress}`;
 const lat= document.getElementById("lat");
 const lon= document.getElementById("lon");
 const city= document.getElementById("city");
 const region= document.getElementById("region");
 const tz = document.getElementById("tz");
 const date= document.getElementById("date");
 const pin= document.getElementById("pin");
 const messg= document.getElementById("messg");
 const photo = document.getElementsByClassName("photo")[0];
 const finaldiv = document.getElementsByClassName("final-div")[0];
 const search = document.getElementById("search");
 
    async function fetchapiDetail(ipaddress){
    const token =`79eb5576a5cc3a`;
    const url = `https://ipinfo.io/${ipaddress}/geo`;
    const headers = { Authorization:`Bearer ${token}`};
    const response = await fetch(url,{headers:headers});
    const result = await response.json();
    console.log(result);

    city.innerHTML=`${result.city}`;
    region.innerHTML=`${result.region}`;
    org.innerHTML=`${result.org}`;
    const arr= result.loc;
    const str= arr.split(",");

    lat.innerHTML=`${str[0]}`;
    lon.innerHTML=`${str[1]}`;
    tz.innerHTML=`${result.timezone}`;
    pin.innerHTML=`${result.postal}`;
    const dateandtime= new Date();
    date.innerHTML=`${dateandtime.toLocaleDateString()},${dateandtime.toLocaleTimeString()}`;
    photo.innerHTML=`
        <iframe
        width="100%"
        height="100%"
        frameborder="0" style="border:0"
        src=https://www.google.com/maps?q=${str[0]},${str[1]}&output=embed allowfullscreen>
        </iframe>
    `;
   getpostoffices(result.postal);



 }
 fetchapiDetail(ipaddress);

 async function getpostoffices(pincode){
 const url = `https://api.postalpincode.in/pincode/${pincode}`;
 const response = await fetch(url);
 const result = await response.json();
 console.log(result);
messg.innerHTML =`${result[0].Message}`;

const postoffice = result[0].PostOffice;
postoffice.forEach(value => {
    const f1= document.createElement("div");
f1.innerHTML=`
      <p>Name  : ${value.Name}</p>
      <p>Branch:  ${value.BranchType} Type</p>
      <p>Delivery: ${value.DeliveryStatus} Status</p>
      <p>District: ${value.District}</p>
        <p>Division: ${value.Division}</p>
`
f1.className ="f1";
finaldiv.appendChild(f1);
});
}

search.addEventListener("keyup",()=>{
  console.log(search.value);
  const res= search.value;
  const pro = getsearchresult(pin.innerHTML);
  pro.then(data=>{
    console.log(data);
    finaldiv.innerHTML="";


    data.forEach(value=>{
     const name = value.Name;
     if(name.toLowerCase().includes(res.toLowerCase())){
        const f1= document.createElement("div");
        f1.innerHTML=`
              <p>Name  : ${value.Name}</p>
              <p>Branch:  ${value.BranchType} Type</p>
              <p>Delivery: ${value.DeliveryStatus} Status</p>
              <p>District: ${value.District}</p>
                <p>Division: ${value.Division}</p>
        `
        f1.className ="f1";
        finaldiv.appendChild(f1);
     }

    })
    
    
  })

})
async function getsearchresult(pincode){
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
 const response = await fetch(url);
 const result = await response.json();
//  console.log(result);
 return result[0].PostOffice;



}


 