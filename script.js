// ===== DATA =====
let animeList = [];

// ===== LOAD DATA =====
function loadAnime() {
    const stored = localStorage.getItem('animeData');
    if (stored) {
        animeList = JSON.parse(stored);
    } else {
        // Default sample data
        animeList = [
            {
                id: 1,
                title: "Naruto Shippuden",
                poster: "https://via.placeholder.com/400x600/1a1a3e/00d4ff?text=Naruto",
                status: "ongoing",
                telegram: "https://t.me/YourBot?start=naruto"
            },
            {
                id: 2,
                title: "Attack on Titan",
                poster: "https://via.placeholder.com/400x600/1a1a3e/7b2ffc?text=AOT",
                status: "completed",
                telegram: "https://t.me/YourBot?start=aot"
            },
            {
                id: 3,
                title: "Demon Slayer",
                poster: "https://via.placeholder.com/400x600/1a1a3e/ff6b6b?text=DS",
                status: "ongoing",
                telegram: "https://t.me/YourBot?start=demon"
            }
        ];
        localStorage.setItem('animeData', JSON.stringify(animeList));
    }
    displayAnime();
}

// ===== DISPLAY ANIME =====
function displayAnime() {
    const grid = document.getElementById('animeGrid');
    if (!grid) return;

    if (animeList.length === 0) {
        grid.innerHTML = `<p style="text-align:center;color:#445566;grid-column:1/-1;padding:40px;">
            No anime added yet. <br> 
            <span style="color:#00d4ff;">Admin panel</span> se add karein!
        </p>`;
        return;
    }

    grid.innerHTML = animeList.map(anime => `
        <div class="anime-card" onclick="showDetails(${anime.id})">
            <img src="${anime.poster}" alt="${anime.title}" 
                 onerror="this.src='https://via.placeholder.com/400x600/1a1a3e/445566?text=No+Image'">
            <div class="card-content">
                <h3>${anime.title}</h3>
                <span class="status status-${anime.status}">${anime.status === 'ongoing' ? '🔄 Ongoing' : '✅ Completed'}</span>
                <br>
                <button class="telegram-btn" onclick="event.stopPropagation(); openTelegram('${anime.telegram}')">
                    📱 Get Episodes
                </button>
            </div>
        </div>
    `).join('');
}

// ===== OPEN TELEGRAM =====
function openTelegram(link) {
    window.open(link, '_blank');
}

// ===== SHOW DETAILS (MODAL) =====
function showDetails(id) {
    const anime = animeList.find(a => a.id === id);
    if (!anime) return;

    const modal = document.getElementById('detailModal');
    if (!modal) {
        createModal(anime);
    } else {
        updateModal(anime);
        modal.style.display = 'flex';
    }
}

function createModal(anime) {
    const modal = document.createElement('div');
    modal.id = 'detailModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            <img src="${anime.poster}" alt="${anime.title}" 
                 onerror="this.src='https://via.placeholder.com/400x600/1a1a3e/445566?text=No+Image'">
            <h2>${anime.title}</h2>
            <p><strong>Status:</strong> <span class="status status-${anime.status}">${anime.status.toUpperCase()}</span></p>
            <p style="margin:15px 0; color:#8899bb;">Get episodes on Telegram:</p>
            <button class="telegram-btn" onclick="openTelegram('${anime.telegram}')">
                📱 Open in Telegram
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function updateModal(anime) {
    const modal = document.getElementById('detailModal');
    if (!modal) return;
    modal.querySelector('img').src = anime.poster;
    modal.querySelector('h2').textContent = anime.title;
    const statusSpan = modal.querySelector('.status');
    statusSpan.textContent = anime.status.toUpperCase();
    statusSpan.className = `status status-${anime.status}`;
    modal.querySelector('.telegram-btn').onclick = function() {
        openTelegram(anime.telegram);
    };
}

function closeModal() {
    const modal = document.getElementById('detailModal');
    if (modal) modal.style.display = 'none';
}

// ===== CLOSE MODAL ON OUTSIDE CLICK =====
document.addEventListener('click', function(e) {
    const modal = document.getElementById('detailModal');
    if (modal && e.target === modal) closeModal();
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', loadAnime);