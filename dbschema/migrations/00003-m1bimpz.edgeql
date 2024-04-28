CREATE MIGRATION m1bimpzfodkrdpwblgobaelm266pgpcwqeaycphcyfeq6asyasce6a
    ONTO m1e4w4vn4vzuojdapgsusjwy3sl73zsfqk5fg3hbc25fl7ssdvbzta
{
  ALTER GLOBAL default::current_user USING (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
