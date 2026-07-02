// Dynamic user local database list begins clean
let foods = JSON.parse(localStorage.getItem('sankofa_custom_foods')) || [];

// UI element targets
const foodList = document.getElementById('foodList');
const emptyPrompt = document.getElementById('emptyPrompt');
const foodInput = document.getElementById('foodInput');
const addFoodForm = document.getElementById('addFoodForm');
const itemCount = document.getElementById('itemCount');
const pickBtn = document.getElementById('pickBtn');

const winnerModal = document.getElementById('winnerModal');
const modalContent = document.getElementById('modalContent');
const recipeModal = document.getElementById('recipeModal');

// Render user options list onto matrix
function renderList() {
    if (foods.length === 0) {
        foodList.classList.add('hidden');
        emptyPrompt.classList.remove('hidden');
        pickBtn.disabled = true;
        pickBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        emptyPrompt.classList.add('hidden');
        foodList.classList.remove('hidden');
        pickBtn.disabled = false;
        pickBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    foodList.innerHTML = '';
    foods.forEach((food, index) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/10 transition-all';
        item.setAttribute('data-index', index);
        item.innerHTML = `
            <div class="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-xl">🍛</div>
            <div class="flex-1 min-w-0">
                <span class="block font-semibold text-on-surface text-base truncate">${food.name}</span>
                <span class="block text-xs text-on-surface-variant/70 uppercase font-bold tracking-tight">Custom Dish</span>
            </div>
            <button onclick="deleteFood(${food.id})" class="text-on-surface-variant/40 hover:text-primary transition-colors p-1">
                <span class="material-symbols-outlined text-xl">delete</span>
            </button>
        `;
        foodList.appendChild(item);
    });
    
    itemCount.innerText = `${foods.length} items`;
    localStorage.setItem('sankofa_custom_foods', JSON.stringify(foods));
}

// Clear individual list elements
window.deleteFood = function(id) {
    foods = foods.filter(f => f.id !== id);
    renderList();
};

// Handle text input item submission
addFoodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = foodInput.value.trim();
    if (name) {
        const newFood = {
            id: Date.now() + Math.random(),
            name: name
        };
        foods.unshift(newFood);
        foodInput.value = '';
        renderList();
        foodList.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Shuffling Roulette Logic Engine
pickBtn.addEventListener('click', () => {
    if (foods.length === 0) return;
    
    pickBtn.disabled = true;
    pickBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-3xl">refresh</span> CHOOSING...';

    let iterations = 12;
    let currentIdx = -1;
    
    const shuffle = setInterval(() => {
        if (currentIdx >= 0) {
            const prevItem = foodList.querySelector(`[data-index="${currentIdx}"]`);
            if (prevItem) prevItem.classList.remove('highlight-shuffle');
        }
        
        currentIdx = Math.floor(Math.random() * foods.length);
        
        const nextItem = foodList.querySelector(`[data-index="${currentIdx}"]`);
        if (nextItem) nextItem.classList.add('highlight-shuffle');
        
        iterations--;
        if (iterations <= 0) {
            clearInterval(shuffle);
            
            const winner = foods[currentIdx];
            showWinner(winner);
            
            pickBtn.disabled = false;
            pickBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">casino</span> PICK FOR ME';
        }
    }, 150);
});

// Display Selected Choice Winner Card Modals
function showWinner(food) {
    document.getElementById('winnerName').innerText = food.name;
    const actionBtn = document.getElementById('modalAction');
    
    // Fallback checks if they spin a custom entry called Jollof Rice again
    if (food.name.toLowerCase().includes('jollof')) {
        actionBtn.innerText = "VIEW RECIPE AGAIN 🇬🇭";
        actionBtn.onclick = () => {
            closeModal();
            setTimeout(openRecipe, 350);
        };
    } else {
        actionBtn.innerText = "LET'S EAT!";
        actionBtn.onclick = closeModal;
    }

    winnerModal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('scale-90', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-90', 'opacity-0');
    setTimeout(() => {
        winnerModal.classList.add('hidden');
    }, 300);
}

function openRecipe() {
    recipeModal.classList.remove('hidden');
}

function closeRecipeModal() {
    recipeModal.classList.add('hidden');
}

// Modal closing assignments
document.getElementById('closeModal').onclick = closeModal;
document.getElementById('modalOverlay').onclick = closeModal;
document.getElementById('closeRecipe').onclick = closeRecipeModal;
document.getElementById('recipeOverlay').onclick = closeRecipeModal;
document.getElementById('recipeDone').onclick = closeRecipeModal;

// Initialize app data configuration models
renderList();

// FORCE OPEN RECIPE MODAL ON PAGE LOAD
openRecipe();