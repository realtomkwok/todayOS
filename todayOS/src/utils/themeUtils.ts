function getThemeColor(): { backgroundColor: string; prefersDark: boolean } {
  // Check if system prefers dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  
  // Get the computed background color from the surface
  const surfaceElement = document.querySelector('body');
  const computedStyle = window.getComputedStyle(surfaceElement!);
  const backgroundColor = computedStyle.backgroundColor;
  
  return { backgroundColor, prefersDark };
}

export function updateThemeColor() {
  const { backgroundColor } = getThemeColor();
  
  // Update theme-color meta tag
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.setAttribute('name', 'theme-color');
    document.head.appendChild(metaThemeColor);
  }
  metaThemeColor.setAttribute('content', backgroundColor);
}
