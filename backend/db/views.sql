-- Views are what Power BI connects to (read-only, clean column names).
CREATE OR REPLACE VIEW v_leads_daily AS
  SELECT created_at::date AS day, type, count(*) AS leads FROM leads GROUP BY 1, 2;
CREATE OR REPLACE VIEW v_inventory_summary AS
  SELECT make, status, count(*) AS cars, round(avg(price)) AS avg_price, round(avg(mileage)) AS avg_mileage
  FROM vehicles GROUP BY make, status;
CREATE OR REPLACE VIEW v_sell_funnel AS
  SELECT created_at::date AS day, status, count(*) AS submissions, round(avg(desired_price)) AS avg_desired_price
  FROM sell_submissions GROUP BY 1, 2;
CREATE OR REPLACE VIEW v_events_daily AS
  SELECT created_at::date AS day, type, count(*) AS events FROM events GROUP BY 1, 2;
CREATE OR REPLACE VIEW v_vehicle_interest AS
  SELECT e.vehicle_slug, v.make, v.model,
         count(*) FILTER (WHERE e.type = 'page_view') AS views,
         count(*) FILTER (WHERE e.type IN ('call','whatsapp','inquiry')) AS contact_clicks
  FROM events e LEFT JOIN vehicles v ON v.slug = e.vehicle_slug
  WHERE e.vehicle_slug IS NOT NULL GROUP BY 1, 2, 3;
