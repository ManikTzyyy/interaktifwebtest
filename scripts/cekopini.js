// Jawaban ideal
const correctAnswerhard = "Perangkat keras adalah komponen fisik dari komputer yang dapat disentuh dan dilihat";
const correctAnswersoft = "Perangkat Lunak adalah sekumpulan program atau instruksi yang mengendalikan dan mengelola perangkat keras";

// Daftar kata kunci
const keywordsHardware = [
  "komponen", "perangkat", "keras", "fisik", "komputer", 
  "bisa", "dapat", "disentuh", "dilihat", "di sentuh", "di lihat", "alat", "hardware", 
  "mesin", "perangkat keras", "elektronik", "circuit"
];
const keywordsSoftware = [
  "program", "lunak", "instruksi", "mengendalikan", "mengelola", 
  "menjalankan", "perintah", "perangkat keras", "software", 
  "kode", "aplikasi", "sistem operasi", "algoritma"
];

// Fungsi Levenshtein Distance untuk menghitung jarak edit antar dua teks
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j] + 1)); // deletion
            }
        }
    }
    return matrix[b.length][a.length];
}

// Fungsi untuk menghitung persentase kemiripan dan menambahkan bonus kata kunci
function similarityPercentage(userInput, correctAnswer, keywords) {
    // Hitung jarak Levenshtein untuk kemiripan teks keseluruhan
    const distance = levenshteinDistance(userInput.toLowerCase(), correctAnswer.toLowerCase());
    const maxLength = Math.max(userInput.length, correctAnswer.length);
    let similarity = ((maxLength - distance) / maxLength) * 100;

    // Hitung bonus untuk kata kunci yang cocok
    let keywordBonus = 0;
    let foundKeywords = 0;
    const lowerInput = userInput.toLowerCase();
    
    keywords.forEach(keyword => {
        if (lowerInput.includes(keyword.toLowerCase())) {
            foundKeywords++;
        }
    });

    // Berikan bonus sebesar 3% untuk setiap kata kunci yang ditemukan, dengan total maksimum hingga 30% dari bonus kata kunci
    keywordBonus = foundKeywords * 3; 
    if (keywordBonus > 30) keywordBonus = 30; // Batas maksimal 30% bonus dari kata kunci

    // Tambahkan bonus kata kunci ke skor akhir
    similarity += keywordBonus;

    // Batasi skor akhir hingga 100%
    return Math.min(similarity, 100);
}

// Fungsi untuk mengecek jawaban perangkat keras
function cekJawabanHardware() {
    const userInput = document.getElementById("userInputHardware").value;

    if (userInput.trim() === "") {
        document.getElementById("resulthardware").innerText = "Masukkan jawaban terlebih dahulu!";
        return;
    }

    const similarity = similarityPercentage(userInput, correctAnswerhard, keywordsHardware);
    let message = "";

    if (similarity >= 70) {
        message = `Jawaban Anda benar!`;
        // message = `Jawaban Anda benar! Tingkat kemiripan: ${similarity.toFixed(2)}%.`;
    } else if (similarity >= 40) {
        message = `Jawaban Anda cukup baik!`;
        // message = `Jawaban Anda cukup baik! Tingkat kemiripan: ${similarity.toFixed(2)}%.`;
    } else {
        message = `Jawaban Anda masih jauh dari benar.`;
        // message = `Jawaban Anda masih jauh dari benar. Tingkat kemiripan: ${similarity.toFixed(2)}%.`;
    }

    document.getElementById("resulthardware").innerText = message;
}

// Fungsi untuk mengecek jawaban perangkat lunak
function cekJawabanSoftware() {
    const userInput = document.getElementById("userInputSoftware").value;

    if (userInput.trim() === "") {
        document.getElementById("resultsoftware").innerText = "Masukkan jawaban terlebih dahulu!";
        return;
    }

    const similarity = similarityPercentage(userInput, correctAnswersoft, keywordsSoftware);
    let message = "";

    if (similarity >= 70) {
        message = `Jawaban Anda benar!`;
        // message = `Jawaban Anda benar! Tingkat kemiripan: ${similarity.toFixed(2)}%.`;
    } else if (similarity >= 40) {
        message = `Jawaban Anda cukup baik!`;
        // message = `Jawaban Anda cukup baik! Tingkat kemiripan: ${similarity.toFixed(2)}%.`;
    } else {
        message = `Jawaban Anda masih jauh dari benar.`;
        // message = `Jawaban Anda masih jauh dari benar. Tingkat kemiripan: ${similarity.toFixed(2)}%.`;
    }

    document.getElementById("resultsoftware").innerText = message;
}
