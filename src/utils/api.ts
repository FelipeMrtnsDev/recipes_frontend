export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchAllRecipes() {
  const res = await fetch(`${API_BASE_URL}/recipes`);
  if (!res.ok) throw new Error('Erro ao buscar receitas');
  return res.json();
}

export async function fetchRecipeById(id: string) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=53086`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function fetchRecipesByIngredient(ingredient: string) {
  const res = await fetch(`${API_BASE_URL}/recipes/ingredient/${ingredient}`);
  if (!res.ok) throw new Error('Erro ao buscar receitas por ingrediente');
  return res.json();
}

export async function fetchRecipesByCountry(country: string) {
  const res = await fetch(`${API_BASE_URL}/recipes/country/${country}`);
  if (!res.ok) throw new Error('Erro ao buscar receitas por país');
  return res.json();
}

export async function fetchRecipesByCategory(category: string) {
  const res = await fetch(`${API_BASE_URL}/recipes/category/${category}`);
  if (!res.ok) throw new Error('Erro ao buscar receitas por categoria');
  return res.json();
}
