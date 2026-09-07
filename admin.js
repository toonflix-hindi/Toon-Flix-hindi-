// ===== CONFIG =====
const ADMIN_PASSWORD = "toonflix2024"; // 🔑 Change karo

// ===== DATA =====
let animeList = [];
let nextId = 1;

// ===== LOAD DATA =====
function loadAnimeData() {
    const stored = localStorage.getItem('animeData');
    if (stored) {
        animeList = JSON.parse(stored);
        if (animeList.length > 0) {
            nextId = Math.max(...animeList.map(a => a.id)) + 1;
        }
    } else {
        animeList = [];
        nextId = 1;
    }
}

// ===== SAVE DATA =====
function saveAnimeData() {
    localStorage.setItem('animeData', JSON.stringify(animeList));
}

// ===== VERIFY ADMIN =====
function verifyAdmin() {
    const pass = document.getElementById('adminPass').value;
    if (pass === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').classList.add('active');
        loadAnimeData();
        displayAdminList();
    } else {
        alert('❌ Wrong Password!');
    }
}

// ===== ADD ANIME =====
function addAnime() {
    const title = document.getElementById('animeTitle').value.trim();
    const poster = document.getElementById('animePoster').value.trim();
    const status = document.getElementById('animeStatus').value;
    const telegram = document.getElementById('animeTelegram').value.trim();

    if (!title || !poster || !telegram) {
        alert('⚠️ Please fill all fields!');
        return;
    }

    const newAnime = {
        id: nextId++,
        title: title,
        poster: poster,
        status: status,
        telegram: telegram
    };

    animeList.push(newAnime);
    saveAnimeData();
    displayAdminList();
    clearForm();
    alert('✅ Anime added successfully!');
}

// ===== DELETE ANIME =====
function deleteAnime(id) {
    if (confirm('Delete this anime?')) {
        animeList = animeList.filter(a => a.id !== id);
        saveAnimeData();
        displayAdminList();
    }
}

// ===== DISPLAY ADMIN LIST =====
function displayAdminList() {
    const container = document.getElementById('animeList');
    if (!container) return;

    if (animeList.length === 0) {
        container.innerHTML = '<p style="color:#445566;">No anime added yet.</p>';
        return;
    }

    container.innerHTML = animeList.map(anime => `
        <div class="anime-item">
            <div class="info">
                <span><strong>${anime.title}</strong></span>
                <span class="badge badge-${anime.status}">${anime.status}</span>
                <br>
                <small style="color:#445566;">${anime.telegram}</small>
            </div>
            <button class="btn-delete" onclick="deleteAnime(${anime.id})">🗑️ Delete</button>
        </div>
    `).join('');
}

// ===== CLEAR FORM =====
function clearForm() {
    document.getElementById('animeTitle').value = '';
    document.getElementById('animePoster').value = '';
    document.getElementById('animeTelegram').value = '';
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem('adminLoggedIn');
    if (confirm('Logout?')) {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('adminContent').classList.remove('active');
        document.getElementById('adminPass').value = '';
    }
}

// ===== AUTO-LOGIN CHECK =====
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').classList.add('active');
        loadAnimeData();
        displayAdminList();
    }
});