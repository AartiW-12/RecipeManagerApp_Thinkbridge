🍽️ The Flavor Journal
========================
The Flavor Journal is a fully client-side web application designed to help users easily create, organize, and view cooking recipes. The app offers a clean, user-friendly UI where users can add recipes with images, ingredients, cooking steps, preparation time, and difficulty level.
The goal of the project is to provide a smooth and intuitive experience for home cooks, food bloggers, and students who want a quick way to store or share recipe information — without requiring any database or backend server.
This app is ideal for learning and demonstrating skills in JavaScript, localStorage, and UI/UX design, making it perfect for portfolios.



📌Overview
============
The Flavor Journal is a fully client-side web application designed to help users create, organize, and view cooking recipes.
The app includes:
1. Add recipes with images
2. Store ingredients, steps, prep time, and difficulty
3. Smooth, user-friendly UI
4. No backend or database required
5. Perfect for beginners, students, and portfolios

This project demonstrates skills in:
1. JavaScript DOM manipulation
2. Web storage API (localStorage)
3. UI/UX design
4. Modular project structure

📁 Project Structure
===================
```
/project-root
│
├── index.html              # Home page listing all recipes
├── recipe.html             # Form to add new recipes
├── detail.html             # Detailed recipe view
│
├── css/
│   └── styles.css          # All styling for the app
│
├── js/
│   ├── app.js              # Main UI logic
│   ├── storage.js          # LocalStorage CRUD operations
│   └── detail.js           # Script for recipe detail page
│
├── assets/
│   ├── logo/
│   │   └── my-recipe-box-logo.png
│   │
│   ├── recipes/
│   │   ├── pav-bhaji.png
│   │   ├── pancakes.png
│   │   └── bolognese.png
│   │
│   └── background/
│       └── background.png
│
└── README.md  # Project readme
```

🚀 How to Run the App
==
1. Option 1: Open directly
    Download the project folder
    Double-click index.html
    The app opens in your browser — no setup required

2. Option 2: Run via local server (recommended for images & modules)
    Install the Live Server extension
    Right-click index.html → Open with Live Server


🗄️ Data Storage (localStorage Structure)
==
recipe = [
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
    }
];

🧷 Assumptions and Limitations
==
1. LocalStorage-Based Architecture
    The application assumes the browser supports localStorage.
    1. Recipes are stored only on the user’s device
    2. No cloud sync, account login, or multi-device access
    3. Data is cleared if the user manually clears browser storage or uses incognito mode

2. Image Handling (Path-Based)
    The app stores only the path of the image, not the actual file.
    1. If a user deletes/moves the image file from the assets folder, the recipe image will break
    2. No file uploads or external hosting

3. No Backend or API
    Because the app runs entirely client-side:
    1. No real authentication
    2. No user accounts
    3. No server validation
    4. No database schema constraints

4. Simple Validation
    The form uses minimal validation.
    1. Assumes users will enter appropriate text for ingredients, steps, and time
    2. Does not check for image format, file size, or invalid URLs


⚠️ Known Issues
==
1. Broken Images If Path Changes: If image file names or folder structure is changed, existing recipes in LocalStorage will show broken images.

2. Duplicate Recipe Titles :
    There is no check to prevent:
    1. Duplicate recipe names
    2. Duplicate image usage

## 🛠 Tech Stack
- *HTML5*  
- *CSS3*  
- *JavaScript*
- *LocalStorage*

