const ruangChat = document.getElementById("chat-room");
const inputUser = document.getElementById("user-input");
const tombolKirim = document.getElementById("send-btn");

tombolKirim.addEventListener("click", function() {
    kirimPesan();
});

inputUser.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        kirimPesan();
    }
});

async function kirimPesan() {
    const teksPesan = inputUser.value.trim();
    if (teksPesan === "") {
        return;
    }

    console.log("Mengirim pesan: " + teksPesan);

    const boksUser = document.createElement("div");
    boksUser.className = "msg-box user";
    boksUser.innerHTML = "<p>" + teksPesan + "</p>";
    ruangChat.appendChild(boksUser);

    inputUser.value = "";
    ruangChat.scrollTop = ruangChat.scrollHeight;

    const boksLoading = document.createElement("div");
    boksLoading.className = "msg-box bot";
    boksLoading.innerHTML = "<p>Paimon sedang berpikir...</p>";
    ruangChat.appendChild(boksLoading);
    ruangChat.scrollTop = ruangChat.scrollHeight;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "openai/gpt-4o-mini",
                "messages": [
                    {
                        "role": "system",
                        "content": "Kamu adalah Paimon dari Genshin Impact, bertindak sebagai asisten chatbot pemandu petualangan yang cerdas, gunakan gaya bicara yang ramah."
                    },
                    {
                        "role": "user",
                        "content": teksPesan
                    }
                ]
            })
        });

        const dataJson = await response.json();
        console.log("Respon API diterima", dataJson);
        
        boksLoading.remove();

        if (dataJson.choices && dataJson.choices[0]) {
            const boksBot = document.createElement("div");
            boksBot.className = "msg-box bot";
            boksBot.innerHTML = "<p>" + dataJson.choices[0].message.content + "</p>";
            ruangChat.appendChild(boksBot);
        } else {
            const boksKosong = document.createElement("div");
            boksKosong.className = "msg-box bot";
            boksKosong.innerHTML = "<p>Paimon tidak menerima jawaban yang valid.</p>";
            ruangChat.appendChild(boksKosong);
        }
        
        ruangChat.scrollTop = ruangChat.scrollHeight;

    } catch (error) {
        console.log("Terjadi error Fetch:", error);
        boksLoading.remove();
        
        const boksError = document.createElement("div");
        boksError.className = "msg-box bot";
        boksError.innerHTML = "<p>Gagal terhubung ke jaringan Teyvat.</p>";
        ruangChat.appendChild(boksError);
        ruangChat.scrollTop = ruangChat.scrollHeight;
    }
}