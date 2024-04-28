CREATE MIGRATION m1h5zt7lzp6gpuddmr3tpchhafg6enecmulcvlbzdwisuuuesrj7cq
    ONTO m1xj6rvegdpsxys25p47qhznsybnrc7nslqg2nlzmyfqvrriw73f3a
{
  ALTER TYPE default::Recipe {
      ALTER PROPERTY porions {
          RENAME TO portions;
      };
  };
};
