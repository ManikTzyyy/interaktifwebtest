document.addEventListener("DOMContentLoaded", function() {
    // Cek apakah nama pengguna sudah disimpan di cookie
    const savedName = Cookies.get("userName");
    
    
    if (savedName) {
        displayPersonalizedSection(savedName);
    }
});

function saveName() {
    const nameInput = document.getElementById("nameInput").value;

    if (nameInput) {
        // Set cookie dengan nama pengguna
        Cookies.set("userName", nameInput, { expires: 7 }); 
        
        location.reload();
        
        // Tampilkan bagian personalisasi
        displayPersonalizedSection(nameInput);
    } else {
        alert("Please enter your name");
    }
}

function displayPersonalizedSection(name) {
    document.getElementById("welcomeSection").style.display = "none";
    document.getElementById("personalizedSection").style.display = "block";
    document.getElementById("userName").innerText = name;
    
}

function logout() {
    // Hapus cookie nama pengguna dan reset UI
    Cookies.remove("userName");
    document.getElementById("personalizedSection").style.display = "none";
    document.getElementById("welcomeSection").style.display = "block";
    location.reload();
}
