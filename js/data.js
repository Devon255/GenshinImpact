async function ambilData(){
    const response = await fetch("https://genshin.jmp.blue/characters?all=true");
    const data = await response.json();
    const wadah = document.getElementById("list-karakter");
    if(response.status == 200){
        console.log("sukses terhubung ke API");
        let htmlCards = ""; 
        
        for(let i = 0; i < data.length; i++){
            const idKarakter = data[i];
            
            const displayName = formatNama(idKarakter);

            htmlCards += `
                <li class="char-card-item" data-char-id="${idKarakter}">
                    <a href="../page/detailChar.html?name=${idKarakter}">
                        <div class="card-glow"></div>
                        <div class="avatar-container">
                            <img src="https://genshin.jmp.blue/characters/${idKarakter}/icon" alt="${displayName}" onerror="this.src='https://genshin.jmp.blue/characters/traveler-anemo/icon';">
                        </div>
                        <span class="char-name">${displayName}</span>
                    </a>
                </li>
            `;
        }
        wadah.innerHTML = htmlCards;
        aktifkanFiturCari();
    }else{
        console.log("gagal terhubung");
    }
}

function aktifkanFiturCari() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) {
        return;
    }

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.char-card-item');
        
        cards.forEach(function(card) {
            const name = card.querySelector('.char-name').textContent.toLowerCase();
            const id = card.getAttribute('data-char-id').toLowerCase();
            
            if (name.includes(query) || id.includes(query)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

function formatNama(teksKarakter) {
    const kumpulanKata = teksKarakter.split("-");
    
    const hasilKapital = kumpulanKata.map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    
    return hasilKapital.join(" ");
}
    
ambilData();