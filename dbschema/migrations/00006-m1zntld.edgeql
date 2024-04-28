CREATE MIGRATION m1zntld6rp3zrlff66tviy5p2l6n5zx5kemlz6kye2d4poctg7gjba
    ONTO m1h5zt7lzp6gpuddmr3tpchhafg6enecmulcvlbzdwisuuuesrj7cq
{
  ALTER TYPE default::Recipe {
      DROP LINK source;
  };
  ALTER TYPE default::Recipe {
      CREATE PROPERTY source: tuple<name: std::str, link: std::str>;
  };
  DROP TYPE default::Source;
};
