import { getAuthClient, e } from "@/app/_stuff/edgedb";

export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const { authenticatedClient } = await getAuthClient();

  const query = e.select(e.Recipe, (recipe) => ({
    ...e.Recipe["*"],
    ingredients: {
      id: true,
      ...e.is(e.RecipeIngredient, {
        testvalue: e.str("sdsd"),
        amount: true,
        extra_info: true,
        id: true,
        ingredient: {
          diet: true,
          name: true,
          id: true,
        },
        unit: {
          id: true,
          short_name: true,
          long_name: true,
        },
      }),
      ...e.is(e.Section, {
        name: true,
      }),
    },
    filter_single: e.op(recipe.slug, "=", params.slug),
  }));
  const recipe = await query.run(authenticatedClient);

  return (
    <div>
      <p>My Recipe: {params.slug}</p>
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </div>
  );
}

// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())

//     return posts.map((post) => ({
//       slug: post.slug,
//     }))
//   }
