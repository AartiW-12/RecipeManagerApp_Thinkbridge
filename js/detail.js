import { getRecipe, deleteRecipe, isFavorite, toggleFavorite } from './storage.js';

function qs(q) {
    return document.querySelector(q);
}

function parseId() {
    const params = new URLSearchParams(location.search);
    return params.get('id');
}

function renderDetail(recipe) {
    const out = document.getElementById('recipeDetail');
    if (!recipe) {
        out.innerHTML = '<p>Recipe not found.</p>';
        return;
    }

    const img = recipe.image ||
        'https://img.freepik.com/free-photo/top-view-fried-fish-pan-with-lemon-parsley-yellow-white-checkered-tablecloth_140725-144775.jpg';

    const isFav = isFavorite(recipe.id);

    out.innerHTML = `
        <img class="detail-hero" src="${img}" alt="${recipe.title}">
        
        <div class="detail-grid">
            <section class="detail-info">

                <!-- Header with Favorite Button -->
                <div class="detail-header">
                    <h2>${recipe.title}</h2>

                    <button id="favoriteBtn" class="favorite-btn-detail">
                        <span id="favoriteText">
                            ${isFav ? 'Favourited' : 'Add to Favourite'}
                        </span>
                    </button>
                </div>

                <p class="small">${recipe.description}</p>

                <div class="card">
                    <h3 class="collapsible">Ingredients</h3>
                    <ul class="content">
                        ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>

                <div class="card">
                    <h3 class="collapsible">Steps</h3>
                    <ol class="content">
                        ${recipe.steps.map(s => `<li>${s}</li>`).join('')}
                    </ol>
                </div>

            </section>

            <aside class="detail-aside">
                <div class="card-body">
                    <p><strong>Prep:</strong> ${recipe.prepTime || 0} min</p>
                    <p><strong>Cook:</strong> ${recipe.cookTime || 0} min</p>
                    <p><strong>Difficulty:</strong> 
                        <span class="badge ${recipe.difficulty}">${recipe.difficulty}</span>
                    </p>

                    <div class="actions">
                        <button id="editBtn" class="primary">Edit</button>
                        <button id="deleteBtn" class="delete-btn">Delete</button>
                    </div>
                </div>
            </aside>
        </div>
    `;

    /* ❤️ TEXT-ONLY Favorite Button */
    const favBtn = document.getElementById('favoriteBtn');
    const favText = document.getElementById('favoriteText');

    favText.textContent = newState ? 'Favourited' : 'Add to Favourite';

    if (newState) {
        favBtn.classList.add("fav-active");
    } else {
        favBtn.classList.remove("fav-active");
    }


    /* Collapsible */
    const collapsibles = out.querySelectorAll('.collapsible');
    collapsibles.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        });
    });

    /* Edit Button */
    document.getElementById('editBtn').addEventListener('click', () => {
        window.location.href = `form.html?id=${encodeURIComponent(recipe.id)}`;
    });

    /* Delete Button */
    document.getElementById('deleteBtn').addEventListener('click', () => {
        if (confirm('Delete this recipe?')) {
            deleteRecipe(recipe.id);
            alert('Recipe deleted successfully!');
            window.location.href = 'index.html';
        }
    });
}

/* Load Recipe */
const id = parseId();
if (!id) {
    document.getElementById('recipeDetail').innerHTML = '<p>No recipe selected.</p>';
} else {
    const recipe = getRecipe(id);
    renderDetail(recipe);
}


favBtn.addEventListener('click', () => {
    const newState = toggleFavorite(recipe.id);

    favText.textContent = newState ? 'Favourited' : 'Add to Favourite';

    if (newState) {
        favBtn.classList.add("fav-active");
    } else {
        favBtn.classList.remove("fav-active");
    }
});
