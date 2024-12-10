async function fetchData() {
    const url = 'https://sn3-sfo.data-di.com/api/v2/sfo/section/recommend?org_id=taiwan202209&access_token=01768d12-9cd8-11ef-bfd2-42010a8c0037';
    
    const headers = {
      "Content-Type": "application/json",
      "project-name": "taipei_uat"
    };
  
    const body = JSON.stringify({
      log_id: "WXCA059A3D84AF05C6",
      section_id: "section_id_6325531414157",
      identity_id_map: {"$identity_login_id": "reg_distinct_id_16859"},
      need_sticky_item: true
    });
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Response:', data);

      if (Array.isArray(data)) {
        console.table(data);
      }
  
      // Use the JSON data in your website
      // Example: Update the DOM or save the data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  fetchData();
