const parameterURL = new URLSearchParams(window.location.search);
const namaKarakter = parameterURL.get('name');
// console.log(namaKarakter);
async function detail() {
    const response = await fetch(`https://genshin.jmp.blue/characters/${namaKarakter}`);
    const dataDetail = await response.json();
    console.log(dataDetail);

    const wadah = document.getElementById("detail");

    let htmlTalent = "";
    let htmlKonstelasi = "";
    let htmlMaterial = "";
    

    for(let i = 0; i < dataDetail.skillTalents.length; i ++){
        let talent = dataDetail.skillTalents[i];
        htmlTalent += `
        <div>
            <h3>${talent.name} - ${talent.unlock}</h3>
            <p>${talent.description}</p>
        </div>
        `;
    }

    for(let j = 0; j < dataDetail.constellations.length; j ++){
        let konst = dataDetail.constellations[j];
        htmlKonstelasi += `
        <div>
            <h4>${konst.unlock}: ${konst.name}</h4>
            <p>${konst.description}</p>
        </div>
        `;
    }

    for(let level in dataDetail.ascension_materials){
        let materialPerLevel = dataDetail.ascension_materials[level];
        htmlMaterial += `
            <div>
                <h4>Level ${level}</h4>
            `;
        for(let k = 0; k < materialPerLevel.length; k++){
            let material = materialPerLevel[k];
            htmlMaterial += `
                <p>${material.name} (x${material.value})</p>
            </div>
            `;
        }
    }
    

    wadah.innerHTML = `
    <h1>${dataDetail.name}</h1>
    <h2>${dataDetail.title}</h2>
    <p><strong>Element:</strong> ${dataDetail.vision}</p>
    <p><strong>Weapon:</strong> ${dataDetail.weapon}</p>
    <p><strong>Region:</strong> ${dataDetail.nation}</p> 
    <p><strong>Story:</strong> ${dataDetail.description}</p>
    <hr>
    <h2>Skill Talents</h2>
    ${htmlTalent}
    <hr>
    <h2>Constellations</h2>
    ${htmlKonstelasi}
    <hr>
    <h2>Ascension Materials</h2>
    ${htmlMaterial}
    `;
}

detail();