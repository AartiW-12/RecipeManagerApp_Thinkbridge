import { getRecipe, deleteRecipe } from './storage.js';
function qs(q) {
    return document.querySelector(q)
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
    const img = recipe.image || '/mnt/data/A_digital_screenshot_displays_a_recipe_management_.png';
    out.innerHTML = `
        <img class="detail-hero" src="${img}" alt="${recipe.title}">
        <div class="detail-grid">
        <section>
        <h2>${recipe.title}</h2>
        <p class="small">${recipe.description}</p>
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        <h3>Steps</h3>
        <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        </section>
        <aside>
        <div class="card-body">
        <p><strong>Prep:</strong> ${recipe.prepTime || 0} min</p>
        <p><strong>Cook:</strong> ${recipe.cookTime || 0} min</p>
        <p><strong>Difficulty:</strong> <span class="badge $
        {recipe.difficulty}">${recipe.difficulty}</span></p>
        <div style="margin-top:12px;display:flex;gap:10px">
        <button id="editBtn" class="primary">Edit</button>
        <button id="deleteBtn" class="btn">Delete</button>
        </div>
        </div>
        </aside>
        </div>`;
    document.getElementById('editBtn').addEventListener('click', () => {
        window.location.href = `form.html?id=${encodeURIComponent(recipe.id)}`;
    });
    document.getElementById('deleteBtn').addEventListener('click', () => {
        if (confirm('Delete this recipe?')) {
            deleteRecipe(recipe.id);
            window.location.href = 'index.html';
        }
    });
}
const id = parseId();
if (!id) {
    document.getElementById('recipeDetail').innerHTML = '<p>No recipe selected.</p>';
} else {
    const recipe = getRecipe(id);
    renderDetail(recipe);
}
