export const createInspection = async (payload: any) => {
  const response = await fetch('http://localhost:5000/inspections/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || 'Failed to create inspection');
  }

  return json.inspection;
};

export const getInspections = async () => {
  const response = await fetch('http://localhost:5000/inspections');
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || 'Failed to fetch inspections');
  }

  return json.inspections;
};