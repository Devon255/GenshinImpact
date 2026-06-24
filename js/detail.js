const parameterURL = new URLSearchParams(window.location.search);
const namaKarakter = parameterURL.get('name');
// console.log(namaKarakter);
async function detail() {
    const response = await fetch(`https://genshin.jmp.blue/characters/${namaKarakter}`);
    const dataDetail = await response.json();
    console.log(dataDetail);

    const wadah = document.getElementById("detail");

    const elementMurni = dataDetail.vision.toLowerCase();
    document.body.setAttribute("data-element", elementMurni);
    wadah.setAttribute("data-element", elementMurni);

    let htmlTalent = "";
    let htmlKonstelasi = "";
    let htmlMaterial = "";
    

    for(let i = 0; i < dataDetail.skillTalents.length; i ++){
        let talent = dataDetail.skillTalents[i];
        htmlTalent += `
        <div class="info-card-item skill-talents-card">
            <h3>${talent.name} - ${talent.unlock}</h3>
            <p>${talent.description}</p>
        </div>
        `;
    }

    for(let j = 0; j < dataDetail.constellations.length; j ++){
        let konst = dataDetail.constellations[j];
        htmlKonstelasi += `
        <div class="info-card-item constellations-card">
            <h4>${konst.unlock}: ${konst.name}</h4>
            <p>${konst.description}</p>
        </div>
        `;
    }

    for(let level in dataDetail.ascension_materials){
        let materialPerLevel = dataDetail.ascension_materials[level];
        let formatNamaLevel = level.replace('_',' ');
        htmlMaterial += `
            <div class="info-card-item ascension-materials-card">
                <h4>${formatNamaLevel}</h4>
            `;
        for(let k = 0; k < materialPerLevel.length; k++){
            let material = materialPerLevel[k];
            htmlMaterial += `
                <p>${material.name} (x${material.value})</p>
            `;
        }
        htmlMaterial += `
            </div>
        `
    }

    function formatStat (title, val){
        return `
            <div class="stat-card">
                <span class="stat-label">${title}</span>
                <span class="stat-value">${val}</span>
            </div>
        `;
    }

    wadah.innerHTML = `
    <div class="profile-wrapper">
        <div class="profile-left">
            <div class="detail-avatar-frame">
                <img src="https://genshin.jmp.blue/characters/${namaKarakter}/icon" alt="${dataDetail.name}">
            </div>
            <div class-"name-container">
                <h1>${dataDetail.name}</h1>
                <h2>${dataDetail.title}</h2>
            </div>
        </div>
        <div class="profile-right">
            <div class="stats-grid">
                ${formatStat("Vision / Element", dataDetail.vision)}
                ${formatStat("Weapon Type", dataDetail.weapon)}
                ${formatStat("Nation / Region", dataDetail.nation)}
            </div>
            <div class="story-block">
                <h3>Biografi</h3>
                <p>${dataDetail.description}</p>
            </div>
        </div>
    </div>
    <h2 class="section-heading">Skill Talents</h2>
    <div class="talents-grid">
        ${htmlTalent}
    </div>

    <h2 class="section-heading">Constellations</h2>
    <div class="constellations-grid">
        ${htmlKonstelasi}
    </div>

    <h2 class="section-heading">Ascension Materials</h2>
    <div class="materials-grid">
        ${htmlMaterial}
    </div>
    `;
}

detail();