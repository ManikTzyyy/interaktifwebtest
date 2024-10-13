document.addEventListener("DOMContentLoaded", function() {
    // Ambil nama dari cookie
    const savedName = Cookies.get("userName");
    if (savedName) {
        // document.getElementById("nama").innerText = "Halo, " + savedName + "!";
        document.getElementById("nama").innerText = savedName;

    } else {
        document.getElementById("nama").innerText = "Tamu!";
    }
});