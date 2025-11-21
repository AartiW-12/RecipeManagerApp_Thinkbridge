import { readRecipes, ensureSeedData } from './storage.js';

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
        description: 'Butter Chicken is a rich, creamy, and flavorful North Indian curry where marinated chicken is grilled and then simmered in a silky tomato-based gravy with butter and cream.',
        ingredients: ["Chicken (boneless or bone-in, cut pieces)", "Thick curd (yogurt)", "Ginger-garlic paste", "Red chili powder", "Turmeric", "Garam masala", "Kasuri methi", "Lemon juice", "Salt", "Oil or melted butter", "Butter", "Oil", "Tomatoes (roughly chopped)", "Onions (chopped)", "Garlic", "Ginger", "Green chilies", "Cashews", "Tomato puree (fresh or canned)", "Kashmiri red chilli powder", "Coriander powder", "Garam masala", "Kasuri methi", "Fresh cream", "Salt", "Sugar or honey (optional for balance)"],
        steps: [
            "Mix yogurt, ginger-garlic paste, chili powder, turmeric, garam masala, lemon juice, and salt.",
            "Add chicken to the mixture and coat it well.",
            "Let the chicken rest for at least 1 hour (overnight is best).",
            "Heat a pan, grill, or tandoor.",
            "Add oil or butter to the pan.",
            "Grill the marinated chicken until char marks appear.",
            "Cook the chicken only up to 70%, as it will finish in the gravy.",
            "Heat butter with a little oil in another pan.",
            "Add garlic, ginger, and green chili; sauté.",
            "Add chopped onions and cook until soft.",
            "Add tomatoes and cashews.",
            "Cook until the tomatoes break down and become mushy.",
            "Let this mixture cool slightly and blend it into a smooth paste.",
            "Heat butter again in a clean pan.",
            "Add the blended paste to the pan.",
            "Add Kashmiri chili powder, coriander powder, salt, and optional sugar/honey.",
            "Cook until the gravy thickens and butter starts separating.",
            "Add the grilled chicken pieces to the gravy.",
            "Add a little water to adjust consistency.",
            "Simmer for 10–15 minutes until the chicken turns soft and flavorful.",
            "Crush Kasuri methi and sprinkle it over the gravy.",
            "Pour in fresh cream.",
            "Mix gently and simmer for 2 minutes.",
            "Turn off the heat and add a cube of butter on top before serving."
        ],
        prepTime: 80,
        cookTime: 30,
        difficulty: 'Medium',
        image: 'https://media.istockphoto.com/id/639390540/photo/indian-butter-chicken.webp?a=1&b=1&s=612x612&w=0&k=20&c=xZvd8MXsgpCBN-QyW1PdNMes0K55UMLQgbhnKNF30HE='
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
}

searchInput.addEventListener('input', () => applyFilters());
difficultyFilter.addEventListener('change', () => applyFilters());
if (prepFilter) prepFilter.addEventListener('change', () => applyFilters());

addBtn.addEventListener('click', () => window.location.href = 'form.html');
if (addEmptyBtn) addEmptyBtn.addEventListener('click', () => window.location.href = 'form.html');

applyFilters();
