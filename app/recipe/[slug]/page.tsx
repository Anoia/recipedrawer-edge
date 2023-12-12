import { getAuthClient, e } from "@/app/_stuff/edgedb";
import { $infer } from "@/dbschema/edgeql-js";

export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const { authenticatedClient } = await getAuthClient();

  const query = e.select(e.Recipe, (recipe) => ({
    ...e.Recipe["*"],
    source: {
      id: true,
      name: true,
      link: true,
    },
    sourceText: recipe.source.name,
    ingredients: (i) => ({
      id: true,
      type: i.__type__.name,
      index: true,
      ...e.is(e.RecipeIngredient, {
        amount: true,
        extra_info: true,
        ingredient: { ...e.Ingredient["*"] },
        unit: { ...e.Unit["*"] },
      }),
    }),
    filter_single: e.op(recipe.slug, "=", params.slug),
  }));
  type result = $infer<typeof query>;
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
