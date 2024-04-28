CREATE MIGRATION m1xj6rvegdpsxys25p47qhznsybnrc7nslqg2nlzmyfqvrriw73f3a
    ONTO m1bimpzfodkrdpwblgobaelm266pgpcwqeaycphcyfeq6asyasce6a
{
  ALTER TYPE default::Ingredient {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::min_len_value(1);
      };
  };
};
