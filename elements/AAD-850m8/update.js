function(instance, properties, context) {
  
  // Step 1: Load Data
  let markdownText = properties.markdown_text;
  let uniqueId = properties.unique_id; // Use a stable unique ID instead of index
  let fontType = instance.data.font_type;
  let themeMode = properties.theme_mode || 'dark';
  
  // Check if markdownText and uniqueId are valid
  if (!markdownText || !uniqueId) {
    return;
  }
  
  try {
    // Convert markdown to HTML
    let converted_html = marked.parse(markdownText);
    
    // Use unique_id instead of index_num for the div ID
    let divId = `convertedHtmlDiv_${uniqueId}`;
    let existingDiv = instance.canvas.find(`#${divId}`);
    
    // Determine theme class
    let themeClass = `theme-${themeMode}`;
    
    if (existingDiv.length > 0) {
      // Update the existing div's content and theme
      existingDiv.html(converted_html);
      existingDiv.removeClass('theme-dark theme-light').addClass(themeClass);
    } else {
      // Create and append a new div if it doesn't exist with theme class
      let div = $(`<div id="${divId}" class="${fontType} prose lg:prose-xl ${themeClass}">${converted_html}</div>`);
      instance.canvas.append(div);
      instance.data.div = div;
    }
    
    // Apply Prism.js to the code blocks in the converted HTML
    Prism.highlightAll();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}