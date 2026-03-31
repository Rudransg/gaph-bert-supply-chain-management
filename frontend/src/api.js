import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 15000,
});

export const fetchHealth        = ()         => API.get("/health");
export const fetchMetrics       = ()         => API.get("/metrics");
export const fetch_Products     = ()         => API.get("/products");
export const fetchAllPreds      = ()         => API.get("/predictions/all");
export const fetchModelInfo     = ()         => API.get("/model/info");
export const runPredict         = (payload)  => API.post("/predict", payload);

// dashboard routes
export const fetchDashboardStats = () =>
  API.get("/dashboard/stats");
export const fetchAtRiskProducts = (topN = 6) =>
  API.get("/products/at-risk", { params: { top_n: topN } });
export const fetchFactoryLoad = () =>
  API.get("/factory/load");

// forecast routes
export const fetchProductTrend = async (product) => {
  try {
    return await API.get(`/forecast/trend/${encodeURIComponent(product)}`);
  } catch (err) {
    if (err.response?.status === 404) {
      return { data: { product, points: [] } };
    }
    throw err;
  }
};

export const fetchProducts = () =>
  API.get("/forecast/products");
