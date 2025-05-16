"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllRecipes();
        console.log("API Data:", data);
        setRecipes(data.meals || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div className="text-center py-8">Loading recipes...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!recipes.length) return <div className="text-center py-8">No recipes found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Recipes</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <li key={recipe.idMeal} className="list-none border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
            <Link href={`/recipe/${recipe.idMeal}`} className="block">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold">{recipe.strMeal}</p>
                {recipe.strCategory && (
                  <p className="text-sm text-gray-600">Category: {recipe.strCategory}</p>
                )}
                {recipe.strArea && (
                  <p className="text-sm text-gray-600">Cuisine: {recipe.strArea}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function fetchAllRecipes() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}