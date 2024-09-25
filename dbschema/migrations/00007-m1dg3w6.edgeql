CREATE MIGRATION m1dg3w6nmfsqqcm5lbjtokpzjnkepbfdilsidwlixmysdjjtc5yxtq
    ONTO m1zntld6rp3zrlff66tviy5p2l6n5zx5kemlz6kye2d4poctg7gjba
{
  ALTER TYPE default::Recipe {
      DROP LINK steps;
  };
  ALTER TYPE default::Recipe {
      CREATE MULTI PROPERTY steps: tuple<index: std::int16, text: std::str>;
  };
  DROP TYPE default::Step;
};
