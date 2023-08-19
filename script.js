

$.get('https://ipinfo.io/${IP}/geo',function(response){
    console.log(response.ip);
    fetchapi=(response.ip);

},"json")