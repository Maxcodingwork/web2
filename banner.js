async function fetchData() {
    const url = 'https://sn3-sfo.data-di.com/api/v2/sfo/section/recommend?org_id=taiwan202209&access_token=01768d12-9cd8-11ef-bfd2-42010a8c0037';
    
    const headers = {
      "Content-Type": "application/json",
      "project-name": "taipei_uat"
    };
  
    const body = JSON.stringify({
      log_id: "WXCA059A3D84AF05C6",
      section_id: "section_id_6325531414157",
      identity_id_map: {"$identity_login_id": "reg_distinct_id_16859"}
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

      const materialProperties = data.data.items[0].material_properties;

      createImageWithLink(materialProperties.link, materialProperties.pic);




      // Use the JSON data in your website
      // Example: Update the DOM or save the data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function createImageWithLink(link, imageUrl) {
    // Create a container for the image
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.height = '100vh'; // Full viewport height
    
  
    // Create a link element
    const anchor = document.createElement('a');
    anchor.href = link; // Set the link
    anchor.target = '_blank'; // Open in a new tab
  
    // Create an image element
    const img = document.createElement('img');
    img.src = imageUrl; // Set the image source
    img.alt = 'Dynamic Content'; // Optional alt text
    img.style.width = '500px'; // Set desired size (optional)
    img.style.border = '1px solid #ddd'; // Optional styling
    img.style.borderRadius = '10px'; // Rounded corners (optional)
  
    // Add the image to the link
    anchor.appendChild(img);
  
    // Add the link to the container
    container.appendChild(anchor);
  
    // Add the container to the body
    document.body.style.margin = '10'; // Remove default body margin
    document.body.appendChild(container);
  }



  fetchData();
