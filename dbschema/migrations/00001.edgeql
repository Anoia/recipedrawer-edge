CREATE MIGRATION m1cv2brn4w5euvfznyvvawx6nehwkp4yp6v7cljbte5dusqjx5ineq
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE TYPE default::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User {
          id,
          name
      }
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
  CREATE TYPE default::IngredientListElement {
      CREATE PROPERTY index: std::int16;
  };
  CREATE TYPE default::Source {
      CREATE PROPERTY link: std::str;
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::Step {
      CREATE PROPERTY index: std::int16;
      CREATE PROPERTY text: std::str;
  };
  CREATE TYPE default::Recipe {
      CREATE MULTI LINK ingredients: default::IngredientListElement;
      CREATE REQUIRED LINK author: default::User;
      CREATE LINK source: default::Source;
      CREATE MULTI LINK steps: default::Step;
      CREATE PROPERTY cook_time: std::duration;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY image: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY porions: std::int16;
      CREATE PROPERTY prep_time: std::duration;
      CREATE PROPERTY slug: std::str;
  };
  CREATE SCALAR TYPE default::Diet EXTENDING enum<Vegan, Vegetarian, Fish, Meat>;
  CREATE TYPE default::Ingredient {
      CREATE LINK recipe: default::Recipe;
      CREATE REQUIRED PROPERTY diet: default::Diet;
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Unit {
      CREATE REQUIRED PROPERTY long_name: std::str;
      CREATE REQUIRED PROPERTY short_name: std::str;
  };
  CREATE TYPE default::RecipeIngredient EXTENDING default::IngredientListElement {
      CREATE REQUIRED LINK ingredient: default::Ingredient;
      CREATE REQUIRED LINK unit: default::Unit;
      CREATE REQUIRED PROPERTY amount: std::int16;
      CREATE PROPERTY extra_info: std::str;
  };
  CREATE TYPE default::Section EXTENDING default::IngredientListElement {
      CREATE REQUIRED PROPERTY name: std::str;
  };
};
