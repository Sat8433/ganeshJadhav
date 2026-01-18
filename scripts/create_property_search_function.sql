-- Create a function for property search with ILIKE
CREATE OR REPLACE FUNCTION search_properties(
  search_city TEXT,
  search_term TEXT
)
RETURNS SETOF properties AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM properties
  WHERE city = search_city
    AND (project_name ILIKE search_term OR unit_number ILIKE search_term)
  ORDER BY registration_date DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;
