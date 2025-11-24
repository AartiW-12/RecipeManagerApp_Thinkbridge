import { readRecipes, ensureSeedData } from './storage.js';
import { isFavorite, toggleFavorite, getFavorites } from './storage.js';

const seed = [
    {
        id: 'pavbhaji-1',
        title: 'Pav Bhaji',
        description: 'Spicy and buttery Mumbai street-food style pav bhaji.',
        ingredients: ['2 potatoes', '1 cup cauliflower', '1 chopped onion', '2 tomatoes', 'pav bhaji masala', 'butter'],
        steps: ['Boil vegetables until soft', 'Mash well', 'Cook with onion, tomato and spices', 'Finish with butter and garnish'],
        prepTime: 15,
        cookTime: 25,
        difficulty: 'Medium',
        image: 'assets/recipes/pav-bhaji.png'
    },
    {
        id: 'pancakes-2',
        title: 'Classic Pancakes',
        description: 'Fluffy pancakes made from scratch.',
        ingredients: ['Flour', 'Milk', 'Egg', 'Sugar'],
        steps: ['Mix ingredients', 'Cook on skillet', 'Serve with syrup'],
        prepTime: 10,
        cookTime: 15,
        difficulty: 'Easy',
        image: 'assets/recipes/pancakes.png'
    },
    {
        id: 'spag-3',
        title: 'Spaghetti Bolognese',
        description: 'Hearty pasta with rich meat sauce.',
        ingredients: ['Spaghetti', 'Minced meat', 'Tomato sauce'],
        steps: ['Cook pasta', 'Prepare sauce', 'Combine and serve'],
        prepTime: 20,
        cookTime: 35,
        difficulty: 'Medium',
        image: 'assets/recipes/bolognese.png'
    },
    {
        id: 'Butter Chicken-4',
        title: 'Butter Chicken',
        description: 'Butter Chicken is a rich, creamy, and flavorful North Indian curry...',
        ingredients: ["Chicken", "Curd", "Spices", "Butter", "Cashews", "Cream"],
        steps: ["Marinate chicken", "Grill", "Cook onion tomato gravy", "Blend", "Simmer with chicken", "Serve"],
        prepTime: 80,
        cookTime: 30,
        difficulty: 'Hard',
        image: 'https://media.istockphoto.com/id/639390540/photo/indian-butter-chicken.webp'
    }
];

ensureSeedData(seed);

// DOM elements
const recipesContainer = document.getElementById('recipesContainer');
const searchInput = document.getElementById('searchInput');
const difficultyFilter = document.getElementById('difficultyFilter');
const prepFilter = document.getElementById('prepTimeFilter');
const addBtn = document.getElementById('addRecipeBtn');
const addEmptyBtn = document.getElementById('addRecipeEmpty');
const emptyState = document.getElementById('emptyState');

/* ----------------------------------------------------
   CARD TEMPLATE (UPDATED TO USE ONLY TEXT FOR FAVORITE)
------------------------------------------------------- */
function formatCard(recipe) {
    const imgSrc = recipe.image || 'assets/ui/default-recipe.png';
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.innerHTML = `
  <div class="card-top">
    <button class="fav-btn" data-id="${recipe.id}">
      <span class="fav-text">
  ${isFavorite(recipe.id)
            ? '<img class="fav-heart" src="assets/favourite/filled_heart.png" />'
            : 'Add to Favourite'}
</span>
    </button>
  </div>

  <img class="card-media" src="${imgSrc}" alt="${recipe.title}">
  
  <div class="card-body">
      <h3 class="card-title">${recipe.title}</h3>
      <span class="badge ${recipe.difficulty}">${recipe.difficulty}</span>
      <p class="card-desc">${recipe.description || ''}</p>
      <div class="card-meta"><span>Prep: ${recipe.prepTime || 0} min</span></div>
  </div>

  <div class="card-actions">
      <button class="btn view">View Recipe</button>
  </div>
`;

    card.querySelector('.view').addEventListener('click', () => {
        window.location.href = `recipe.html?id=${encodeURIComponent(recipe.id)}`;
    });

    return card;
}

/* ----------------------------------------------------
   RENDER CARDS
------------------------------------------------------- */
function render(list) {
    recipesContainer.innerHTML = '';
    if (!list.length) {
        emptyState.hidden = false;
        return;
    }
    emptyState.hidden = true;
    list.forEach(r => recipesContainer.appendChild(formatCard(r)));
}

/* ----------------------------------------------------
   FILTERS
------------------------------------------------------- */
function getFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const difficulty = difficultyFilter.value;
    const prep = prepFilter ? prepFilter.value : 'All';
    return { q, difficulty, prep };
}

function applyFilters() {
    const all = readRecipes();
    const { q, difficulty, prep } = getFilters();

    let filtered = all.filter(r => r.title.toLowerCase().includes(q));

    if (difficulty && difficulty !== 'All') {
        filtered = filtered.filter(r => r.difficulty === difficulty);
    }

    if (prep && prep !== 'All') {
        filtered = filtered.filter(r => r.prepTime <= parseInt(prep));
    }

    render(filtered);
    updateFavoriteIcons();
    attachFavoriteHandlers();
}

searchInput.addEventListener('input', applyFilters);
difficultyFilter.addEventListener('change', applyFilters);
if (prepFilter) prepFilter.addEventListener('change', applyFilters);

addBtn.addEventListener('click', () => window.location.href = 'form.html');
if (addEmptyBtn) addEmptyBtn.addEventListener('click', () => window.location.href = 'form.html');

applyFilters();

/* ----------------------------------------------------
   FAVORITE: UPDATE BUTTON TEXT
------------------------------------------------------- */
function updateFavoriteIcons() {
    const favs = getFavorites();
    document.querySelectorAll('.fav-btn').forEach(btn => {
        const id = btn.dataset.id;
        const text = btn.querySelector('.fav-text');

        if (!text) return;

        if (favs.includes(id)) {
            text.innerHTML = `<img class="fav-heart" src="assets/icons/heart-filled.png" />`;
        } else {
            text.textContent = 'Add to Favourite';
        }
    });
}



/* ----------------------------------------------------
   FAVORITE: CLICK HANDLER
------------------------------------------------------- */
function attachFavoriteHandlers() {
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.removeEventListener('click', btn._favHandler);

        const handler = () => {
            const id = btn.dataset.id;
            const newState = toggleFavorite(id);

            const text = btn.querySelector('.fav-text');
            if (newState) {
                text.innerHTML = `<img class="fav-heart" src="assets/favourite/filled_heart.png" />`;
            } else {
                text.textContent = 'Add to Favourite';
            }
        };

        btn.addEventListener('click', handler);
        btn._favHandler = handler;
    });
}

updateFavoriteIcons();
attachFavoriteHandlers();
