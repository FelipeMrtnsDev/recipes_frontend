import Ingredients from "@/components/Ingredients"

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  [key: string]: any;
}

export default async function Page({ params }: { params: Promise<{id:string}>}) {

  const { id } = await params


  return (
    <Ingredients id={id} />
  );
}