import Papa from 'papaparse';

export async function loadGodownsFromCSV() {
  const response = await fetch('/datasets/tableConvert.com_33ub1d (1).csv');
  const csvText = await response.text();
  const { data } = Papa.parse(csvText, { header: false });
  // Map to objects with keys
  return data.map(row => ({
    id: row[0],
    district: row[1],
    location: row[2],
    scheme: row[3],
    capacity: row[4],
    year: row[5],
  }));
}
