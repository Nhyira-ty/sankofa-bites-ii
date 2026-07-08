// Reactive local storage array cache
let menuItems = JSON.parse(localStorage.getItem('sankofa_menu_cache')) || [];

// Explicit Layout Node Selections
const foodList = document.getElementById('foodList');
const foodInput = document.getElementById('foodInput');
const addFoodForm = document.getElementById('addFoodForm');
const itemCount = document.getElementById('itemCount');
const pickBtn = document.getElementById('pickBtn');

const miniMysteryTrigger = document.getElementById('miniMysteryTrigger');
const recipeModal = document.getElementById('recipeModal');
const closeRecipeBtn = document.getElementById('closeRecipeBtn');
const recipeDoneBtn = document.getElementById('recipeDoneBtn');
const recipeOverlay = document.getElementById('recipeOverlay');

const winnerModal = document.getElementById('winnerModal');
const winnerName = document.getElementById('winnerName');
const closeWinnerBtn = document.getElementById('closeWinnerBtn');
const winnerOverlay = document.getElementById('winnerOverlay');

// Dynamic View Sync Renderer 
function updateUI() {
    foodList.innerHTML = '';
    
    if (menuItems.length === 0) {
        pickBtn.disabled = true;
        foodList.innerHTML = `
            <div class="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-outline-variant/40 rounded-3xl text-on-surface-variant/50 my-auto py-12">
                <span class="material-symbols-outlined text-4xl mb-1 opacity-60">restaurant_menu</span>
                <p class="font-semibold text-sm">Your custom list is empty</p>
                <p class="text-[11px]">Type and append dishes above to start tracking selection fates!</p>
            </div>`;
    } else {
        pickBtn.disabled = false;
        menuItems.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/10 w-full';
            row.innerHTML = `
                <div class="w-9 h-9 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-lg flex-shrink-0">🍲</div>
                <span class="flex-1 font-semibold text-on-surface truncate">${item}</span>
                <button class="text-on-surface-variant/40 hover:text-red-600 transition-colors p-1" type="button" data-index="${index}">
                    <span class="material-symbols-outlined text-xl">delete</span>
                </button>`;
            
            // Attach a secure click listener to the unique row item's delete key
            row.querySelector('button').addEventListener('click', function() {
                removeItem(index);
            });
            
            foodList.appendChild(row);
        });
    }
    itemCount.innerText = `${menuItems.length} items`;
    localStorage.setItem('sankofa_menu_cache', JSON.stringify(menuItems));
}

// Mutation Handlers
function removeItem(index) {
    menuItems.splice(index, 1);
    updateUI();
}

addFoodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = foodInput.value.trim();
    if (val) {
        menuItems.unshift(val);
        foodInput.value = '';
        updateUI();
    }
});

// Carousel Randomizer Algorithm
pickBtn.addEventListener('click', () => {
    if (menuItems.length === 0) return;
    pickBtn.disabled = true;
    
    let counter = 10;
    const timer = setInterval(() => {
        const nodes = foodList.children;
        if (nodes.length > 0) {
            for (let n of nodes) n.classList.remove('bg-primary-fixed/60');
            const rand = Math.floor(Math.random() * menuItems.length);
            if(nodes[rand] && nodes[rand].classList) {
                nodes[rand].classList.add('bg-primary-fixed/60');
            }
        }
        counter--;
        if (counter <= 0) {
            clearInterval(timer);
            const finalIndex = Math.floor(Math.random() * menuItems.length);
            winnerName.innerText = menuItems[finalIndex];
            winnerModal.classList.remove('hidden');
            pickBtn.disabled = false;
        }
    }, 120);
});

// Explicit Unbroken Trigger Bindings for recipe modals
miniMysteryTrigger.addEventListener('click', () => { recipeModal.classList.remove('hidden'); });
closeRecipeBtn.addEventListener('click', () => { recipeModal.classList.add('hidden'); });
recipeDoneBtn.addEventListener('click', () => { recipeModal.classList.add('hidden'); });
recipeOverlay.addEventListener('click', () => { recipeModal.classList.add('hidden'); });

// Explicit Trigger Bindings for winner target dialog modals
closeWinnerBtn.addEventListener('click', () => { winnerModal.classList.add('hidden'); updateUI(); });
winnerOverlay.addEventListener('click', () => { winnerModal.classList.add('hidden'); updateUI(); });

// Initial setup boot pass
updateUI();