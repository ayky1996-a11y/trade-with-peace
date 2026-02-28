// Function to fetch data from Google Sheets using Google Visualization API
export const fetchGoogleSheetData = async (sheetId, sheetName = 0) => {
  try {
    // Use Google Visualization API which handles CORS properly
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${sheetName}`;
    
    console.log('Fetching from:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }
    
    const text = await response.text();
    console.log('Raw response length:', text.length);
    
    // Google returns a JavaScript function call, we need to extract the JSON
    // Format: /*O_o*/google.visualization.Query.setResponse({...})
    const jsonMatch = text.match(/setResponse\((.*)\)/s);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Google Sheets');
    }
    
    const jsonStr = jsonMatch[1];
    const jsonData = JSON.parse(jsonStr);
    
    console.log('Parsed JSON status:', jsonData.status);
    
    if (jsonData.status !== 'ok') {
      throw new Error(`Google Sheets error: ${jsonData.errors?.join(', ') || 'Unknown error'}`);
    }
    
    if (!jsonData.table || !jsonData.table.rows) {
      return { headers: [], data: [] };
    }
    
    // Extract headers from cols, using column index if label is empty
    const headers = jsonData.table.cols.map((col, idx) => 
      col.label && col.label.trim() ? col.label : `Column ${String.fromCharCode(65 + idx)}`
    );
    
    // Extract data rows - filter out completely empty rows
    const data = jsonData.table.rows
      .filter(row => row.c && row.c.some(cell => cell !== null && cell.v !== null && cell.v !== ''))
      .map(row => {
        const rowObj = {};
        headers.forEach((header, index) => {
          const cellValue = row.c[index];
          // Use formatted value if available, otherwise raw value
          rowObj[header] = cellValue?.f || cellValue?.v || '';
        });
        return rowObj;
      });
    
    console.log('Parsed headers count:', headers.length);
    console.log('Parsed data rows:', data.length);
    
    if (data.length > 0) {
      console.log('Sample data:', data[0]);
    }
    
    return { headers, data };
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    throw error;
  }
};
