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
        image: 'assets/recipes/butter-chicken.png'
    },
    {
        id: 'veg-fried-rice-6',
        title: 'Veg Fried Rice',
        description: 'Quick and tasty vegetable fried rice with colorful veggies and aromatic spices.',
        ingredients: [
            '1 cup basmati rice',
            '2 cups water',
            '1/2 cup chopped carrots',
            '1/2 cup green peas',
            '1/2 cup chopped capsicum',
            '1 small onion, chopped',
            '2-3 garlic cloves, minced',
            '2 tbsp soy sauce',
            '1 tbsp oil',
            'Salt to taste',
            'Black pepper to taste',
            'Spring onions for garnish'
        ],
        steps: [
            'Rinse the rice thoroughly and cook it in 2 cups of water until soft. Let it cool.',
            'Heat oil in a wok or large pan over medium heat.',
            'Add chopped onions and garlic, sauté until fragrant.',
            'Add carrots, peas, and capsicum. Stir-fry for 3-4 minutes until vegetables are slightly tender.',
            'Add the cooked rice to the pan and mix gently.',
            'Add soy sauce, salt, and black pepper. Toss everything evenly on medium heat for 2-3 minutes.',
            'Garnish with chopped spring onions and serve hot.'
        ],
        prepTime: 10,
        cookTime: 15,
        difficulty: 'Easy',
        image: 'assets/recipes/veg-fried-rice.png'
    },
    {
        id: 'puran-poli-7',
        title: 'Puran Poli',
        description: 'Traditional Maharashtrian sweet flatbread stuffed with a mixture of chana dal and jaggery.',
        ingredients: [
            '1 cup chana dal (split Bengal gram)',
            '3/4 cup jaggery, grated',
            '1/4 tsp cardamom powder',
            '1 1/2 cups whole wheat flour',
            '2 tbsp oil or ghee for dough',
            'Water as needed',
            'Ghee for cooking'
        ],
        steps: [
            'Wash chana dal thoroughly and cook in water until soft. Drain excess water.',
            'Grind the cooked dal into a coarse paste using a food processor or mortar-pestle.',
            'Heat a pan and add jaggery to the dal paste. Cook on low heat until it forms a thick, sticky mixture.',
            'Add cardamom powder and mix well. Let it cool completely.',
            'Prepare the dough by mixing wheat flour, oil, and enough water to make a soft dough. Rest for 15-20 minutes.',
            'Divide the dough and filling into equal portions.',
            'Roll out one portion of the dough into a small circle. Place a portion of filling in the center and seal the edges.',
            'Gently roll the stuffed dough into a flat circle without letting the filling spill out.',
            'Heat a flat pan and cook the puran poli on medium heat, applying ghee on both sides until golden brown spots appear.',
            'Serve warm with a drizzle of ghee.'
        ],
        prepTime: 45,
        cookTime: 30,
        difficulty: 'Hard',
        image: 'assets/recipes/puran-poli.png'
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


function render(list) {
    recipesContainer.innerHTML = '';
    if (!list.length) {
        emptyState.hidden = false;
        return;
    }
    emptyState.hidden = true;
    list.forEach(r => recipesContainer.appendChild(formatCard(r)));
}


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


function updateFavoriteIcons() {
    const favs = getFavorites();
    document.querySelectorAll('.fav-btn').forEach(btn => {
        const id = btn.dataset.id;
        const text = btn.querySelector('.fav-text');

        if (!text) return;

        if (favs.includes(id)) {
            text.innerHTML = `<img class="fav-heart" src="assets/favourite/filled_heart.png" />`;
        } else {
            text.textContent = 'Add to Favourite';
        }
    });
}


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

/* -----------------------------
   FAVOURITES SIDEBAR PANEL
------------------------------ */

const favPanel = document.getElementById('favPanel');
const favList = document.getElementById('favList');
const openFavPanel = document.getElementById('openFavPanel');
const closeFavPanel = document.getElementById('closeFavPanel');

function loadFavouriteSidebar() {
    const all = readRecipes();
    const favIds = getFavorites();

    favList.innerHTML = '';

    const favRecipes = all.filter(r => favIds.includes(r.id));

    if (favRecipes.length === 0) {
        favList.innerHTML = `<li>No favourite recipes yet.</li>`;
        return;
    }

    favRecipes.forEach(recipe => {
        const li = document.createElement('li');
        li.textContent = recipe.title;

        li.addEventListener('click', () => {
            window.location.href = `recipe.html?id=${recipe.id}`;
        });

        favList.appendChild(li);
    });
}

openFavPanel.addEventListener('click', () => {
    loadFavouriteSidebar();
    favPanel.classList.add('open');
});

closeFavPanel.addEventListener('click', () => {
    favPanel.classList.remove('open');
});


updateFavoriteIcons();
attachFavoriteHandlers();

window.addEventListener('load', () => {
    if (window.location.hash) {
        history.replaceState(null, null, 'index.html');
    }
    window.scrollTo(0, 0);
});