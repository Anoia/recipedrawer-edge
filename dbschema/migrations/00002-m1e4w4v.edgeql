CREATE MIGRATION m1e4w4vn4vzuojdapgsusjwy3sl73zsfqk5fg3hbc25fl7ssdvbzta
    ONTO m1cv2brn4w5euvfznyvvawx6nehwkp4yp6v7cljbte5dusqjx5ineq
{
  ALTER TYPE default::IngredientListElement {
      ALTER PROPERTY index {
          SET REQUIRED USING (0);
      };
  };
  ALTER TYPE default::Recipe {
      ALTER LINK ingredients {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER LINK source {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER LINK steps {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY slug {
          CREATE CONSTRAINT std::exclusive;
          SET REQUIRED USING ('defaultslug');
      };
  };
};
