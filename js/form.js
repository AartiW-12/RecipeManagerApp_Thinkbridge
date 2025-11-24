import { uid, addRecipe, updateRecipe, getRecipe } from './storage.js';

function $id(id) {
    return document.getElementById(id);
}

function parseId() {
    const params = new URLSearchParams(location.search);
    return params.get('id');
}

function showError(field, msg) {
    const el = document.querySelector(`.error[data-for="${field}"]`);
    if (el) el.textContent = msg || '';
}

function validate(fields) {
    let valid = true;

    if (!fields.title || fields.title.trim().length < 2) {
        showError('title', 'Title is required (min 2 chars)');
        valid = false;
    } else showError('title', '');

    if (!fields.description || fields.description.trim().length < 10) {
        showError('description', 'Description required (min 10 chars)');
        valid = false;
    } else showError('description', '');

    if (!fields.ingredients || !fields.ingredients.length) {
        showError('ingredients', 'Add at least one ingredient');
        valid = false;
    } else showError('ingredients', '');

    if (!fields.steps || !fields.steps.length) {
        showError('steps', 'Add at least one step');
        valid = false;
    } else showError('steps', '');

    return valid;
}

function gather() {
    return {
        title: $id('title').value.trim(),
        description: $id('description').value.trim(),
        ingredients: $id('ingredients').value
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean),
        steps: $id('steps').value
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean),

        prepTime: Number($id('prepTime').value) || 0,
        cookTime: Number($id('cookTime').value) || 0,
        difficulty: $id('difficulty').value,
        image: $id('image').value.trim() || ''
    };
}

const form = $id('recipeForm');
const formTitle = $id('formTitle');
const id = parseId();

if (id) {
    formTitle.textContent = 'Edit Recipe';

    const recipe = getRecipe(id);
    if (recipe) {
        $id('title').value = recipe.title || '';
        $id('description').value = recipe.description || '';
        $id('ingredients').value = (recipe.ingredients || []).join('\n');
        $id('steps').value = (recipe.steps || []).join('\n');
        $id('prepTime').value = recipe.prepTime || '';
        $id('cookTime').value = recipe.cookTime || '';
        $id('difficulty').value = recipe.difficulty || 'Medium';
        $id('image').value = recipe.image || './assets/default/default_recipe.png';
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = gather();

    if (!validate(data)) return;

    if (id) {
        updateRecipe(id, data);
        window.location.href = `recipe.html?id=${encodeURIComponent(id)}`;
    } else {
        const newId = uid();
        addRecipe({ id: newId, ...data });
        window.location.href = `recipe.html?id=${encodeURIComponent(newId)}`;
    }
});

['title', 'description', 'ingredients', 'steps'].forEach(name => {
    $id(name).addEventListener('input', () => {
        console.log(name + ' input detected!');
        validate(gather());
    });
});
