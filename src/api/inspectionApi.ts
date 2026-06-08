const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const createInspection = async (payload: any) => {
  const response = await fetch(`${BASE_URL}/inspections/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to create inspection");
  }

  return json.inspection;
};

export const getInspections = async () => {
  const response = await fetch(`${BASE_URL}/inspections`);
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to fetch inspections");
  }

  return json.inspections;
};