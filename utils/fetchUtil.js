const API_KEY = process.env.BATTLEMETRICS_API_KEY;

async function fetchBattleMetrics(endpoint) {
  const response = await fetch(`https://api.battlemetrics.com${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}

module.exports = { fetchBattleMetrics };
