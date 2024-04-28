using extension auth;

module default {
    global current_user := (
        assert_single((
            select User
            filter .identity = global ext::auth::ClientTokenIdentity
        ))
    );

    type User {
        required name: str;
        required identity: ext::auth::Identity;
    }

    scalar type Diet extending enum<Vegan, Vegetarian, Fish, Meat>;

    type Ingredient{
        required name: str{
        constraint exclusive;
        constraint min_len_value(1);
    }
        required diet: Diet;
        recipe: Recipe;
    }

    type Recipe{
        required name: str;
        required portions: int16;
        required author: User;
        multi ingredients: IngredientListElement {
            constraint exclusive;
        };
        multi steps: tuple<index:int16, text:str>;
        description: str;
        image: str;
        cook_time: duration;
        prep_time: duration;
        source: tuple<name:str, link:str>;
        required slug: str {
            constraint exclusive;
        };
    }

    type Unit{
        required short_name: str;
        required long_name: str;
    }

    type IngredientListElement{
        required index: int16;
    }

    type RecipeIngredient extending IngredientListElement{
        required amount: int16;
        required ingredient: Ingredient;
        required unit: Unit;
        extra_info: str;
    }

    type Section extending IngredientListElement{
        required name: str;
    }

}
