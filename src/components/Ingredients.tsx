"use client"

import { fetchRecipeById } from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;
  strCategory?: string;
  strArea?: string;
  [key: string]: any;
}

export default function Ingredients({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchIngredients() {
      try {
        const data = await fetchRecipeById(id);
        console.log(data)
        setRecipe(data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading recipe...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!recipe) return <div className="text-center py-8">Recipe not found</div>;

  const ingredientsList: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`] as string;
    const measure = recipe[`strMeasure${i}`] as string;
    if (ingredient && ingredient.trim() !== "") {
      ingredientsList.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{recipe.strMeal}</h1>
      
      <div className="flex justify-center mb-8">
        {recipe.strMealThumb ? (
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal || "Recipe image"}
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-black rounded-lg flex items-center justify-center">
            <span>No image available</span>
          </div>
        )}
      </div>

      {/* Seção de Ingredientes */}
      <div className="bg-black p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Ingredients</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ingredientsList.map((ingredient, index) => (
            <li key={index} className="py-2 px-4 bg-gray-900 rounded shadow-sm">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-black p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Instructions</h2>
        <div className="prose max-w-none">
          {recipe.strInstructions?.split('\r\n').map((paragraph: string, index: number) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Botão de Voltar */}
      <div className="mt-8 text-center">
        <Link href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Back to Recipes
        </Link>
      </div>
    </div>
  );
}