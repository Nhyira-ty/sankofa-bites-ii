const foods = [
{
name:"Jollof Rice",
type:"Local Favorite",
desc:"A delicious Ghanaian rice dish loved across West Africa."
},
{
name:"Waakye",
type:"Local Favorite",
desc:"Rice and beans served with tasty sides."
},
{
name:"Banku & Tilapia",
type:"Local Favorite",
desc:"Traditional Ghanaian favorite."
},
{
name:"Kenkey & Fish",
type:"Local Favorite",
desc:"A coastal classic packed with flavor."
},
{
name:"Fufu & Light Soup",
type:"Local Favorite",
desc:"A beloved Ghanaian comfort meal."
},
{
name:"Red Red",
type:"Local Favorite",
desc:"Beans stew served with fried plantain."
},
{
name:"Pizza",
type:"Continental",
desc:"Cheesy, warm and satisfying."
},
{
name:"Burger",
type:"Continental",
desc:"Juicy and packed with flavor."
},
{
name:"Pasta",
type:"Continental",
desc:"Italian comfort food at its best."
},
{
name:"Sushi",
type:"Continental",
desc:"Fresh Japanese delicacy."
},
{
name:"Ramen",
type:"Continental",
desc:"Rich noodle soup with bold flavors."
}
];

const foodName = document.getElementById("foodName");
const foodType = document.getElementById("foodType");
const foodDesc = document.getElementById("foodDesc");
const pickBtn = document.getElementById("pickBtn");
const card = document.querySelector(".food-card");

pickBtn.addEventListener("click", () => {

const randomFood =
foods[Math.floor(Math.random() * foods.length)];

foodName.textContent = randomFood.name;
foodType.textContent = randomFood.type;
foodDesc.textContent = randomFood.desc;

card.classList.remove("spin");

setTimeout(() => {
card.classList.add("spin");
}, 10);

});