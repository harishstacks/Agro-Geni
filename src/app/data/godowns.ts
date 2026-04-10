// Utility to load godown data from CSV
import godownData from '../../../datasets/tableConvert.com_33ub1d (1).csv';

export function getGodownList() {
  // godownData is an array of objects if using a CSV loader like vite-plugin-csv or similar
  // Otherwise, you may need to parse CSV manually or use a library
  return godownData;
}
