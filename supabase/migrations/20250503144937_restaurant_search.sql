create or replace function restaurants_in_box(min_lat float, min_long float, max_lat float, max_long float)
returns table (id public.restaurants.id%TYPE, restaurantName public.restaurants.restaurantName%TYPE, restaurantDetails public.restaurants.restaurantDetails%TYPE, lat float, long float)
set search_path to ''
language sql
as $$
	select id, restaurantName, restaurantDetails, gis.st_y(restaurantCoords::gis.geometry) as lat, gis.st_x(restaurantCoords::gis.geometry) as long
	from public.restaurants
	where restaurantCoords operator(gis.&&) gis.ST_SetSRID(gis.ST_MakeBox2D(gis.ST_Point(min_long, min_lat), gis.ST_Point(max_long, max_lat)), 4326)
$$;
