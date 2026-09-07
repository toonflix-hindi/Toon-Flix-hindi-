// admin.js
import { db, collection, addDoc, getDocs, deleteDoc, doc } from './firebase-config.js';

let animeList = [];

async function loadAnimeData() {
    try {
        const querySnapshot = await getDocs(collection(db, "anime"));
        animeList = [];
        querySnapshot.forEach((doc) => {
            animeList.push({ id: doc.id, ...doc.data() });
        });
        displayAdminList();
    } catch (error) {
        console.error("Error loading data:", error);
        alert('❌ Error loading data from Firebase');
    }
}

async function addAnime() {
    const title = document.getElementById('animeTitle').value.trim();
    const poster = document.getElementById('animePoster').value.trim();
    const status = document.getElementById('animeStatus').value;
    const telegram = document.getElementById('animeTelegram').value.trim();

    if (!title || !poster || !telegram) {
        alert('⚠️ Please fill all fields!');
        return;
    }

    try {
        await addDoc(collection(db, "anime"), {
            title: title,
            poster: poster,
            status: status,
            telegram: telegram
        });
        alert('✅ Anime added successfully!');
        clearForm();
        loadAnimeData();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert('❌ Error adding anime. Please try again.');
    }
}

async function deleteAnime(id) {
    if (confirm('Delete this anime?')) {
        try {
            await deleteDoc(doc(db, "anime", id));
            alert('🗑️ Anime deleted!');
            loadAnimeData();
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert('❌ Error deleting anime. Please try again.');
        }
    }
}

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
            <button class="btn-delete" onclick="deleteAnime('${anime.id}')">🗑️ Delete</button>
        </div>
    `).join('');
}

function clearForm() {
    document.getElementById('animeTitle').value = '';
    document.getElementById('animePoster').value = '';
    document.getElementById('animeTelegram').value = '';
}

const ADMIN_PASSWORD = "admin123";

function verifyAdmin() {
    const pass = document.getElementById('adminPass').value;
    if (pass === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').classList.add('active');
        loadAnimeData();
    } else {
        alert('❌ Wrong Password!');
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    if (confirm('Logout?')) {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('adminContent').classList.remove('active');
        document.getElementById('adminPass').value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').classList.add('active');
        loadAnimeData();
    }
});

// Make functions globally accessible
window.addAnime = addAnime;
window.deleteAnime = deleteAnime;
window.verifyAdmin = verifyAdmin;
window.logout = logout;
