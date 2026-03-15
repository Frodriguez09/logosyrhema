export function stripHtml(html) {
  // Crear un elemento temporal
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  // Retornar solo el texto sin HTML
  return tmp.textContent || tmp.innerText || '';
}

export function truncateText(text, maxLength = 150) {
  const cleanText = stripHtml(text);
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.substring(0, maxLength) + '...';
}