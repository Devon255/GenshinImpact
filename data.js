async function ambilData(){
    const response = await fetch("https://genshin.jmp.blue/characters?all=true");
    const data = await response.json();
    const wadah = document.getElementById("list-karakter");
    if(response.status == 200){
        console.log("sukses terhubung ke API");
    }else{
        console.log("gagal terhubung");
    }
    for(i = 0; i < data.length; i++){
        // wadah.innerHTML += "<li>" + data[i] + "</li>";
        wadah.innerHTML += "<li><a href = 'detailChar.html?name=" + data[i] + "'>" + data[i] + "</a></li>"
    }
    }
    
ambilData();