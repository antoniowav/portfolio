// Font toggle functionality
import type { FontFamily } from '@/types'

export const FONT_STORAGE_KEY = 'fontFamily'

/**
 * Toggle between available font families
 */
export function toggleFont(): FontFamily {
  const fonts: FontFamily[] = ['mono', 'sans', 'serif']
  const currentFont = getCurrentFont()
  const currentIndex = fonts.indexOf(currentFont)
  const nextFont = fonts[(currentIndex + 1) % fonts.length]

  // Create a smooth transition when changing fonts
  document.documentElement.classList.add('smooth-font-change')
  setFont(nextFont)

  // Remove the transition class after the transition completes
  setTimeout(() => {
    document.documentElement.classList.remove('smooth-font-change')
  }, 350)

  return nextFont
}

/**
 * Get the current font family
 */
export function getCurrentFont(): FontFamily {
  // First check the HTML attribute
  const htmlFont = document.documentElement.getAttribute(
    'data-font'
  ) as FontFamily

  if (htmlFont && ['mono', 'sans', 'serif'].includes(htmlFont)) {
    return htmlFont
  }

  // Then try localStorage
  const savedFont = localStorage.getItem(FONT_STORAGE_KEY) as FontFamily

  if (savedFont && ['mono', 'sans', 'serif'].includes(savedFont)) {
    return savedFont
  }

  // Default to mono
  return 'mono'
}

/**
 * Set the font family
 */
export function setFont(font: FontFamily): void {
  if (!['mono', 'sans', 'serif'].includes(font)) {
    font = 'mono'
  }

  // Add a transition class before changing font
  document.documentElement.classList.add('font-transitioning')

  // Update the HTML attribute
  document.documentElement.setAttribute('data-font', font)

  // Save to localStorage
  localStorage.setItem(FONT_STORAGE_KEY, font)

  // Force a style recalculation
  forceStyleRefresh()

  // Dispatch a custom event for other components
  window.dispatchEvent(new CustomEvent('fontChange', { detail: { font } }))

  // Remove transition class after a short delay
  setTimeout(() => {
    document.documentElement.classList.remove('font-transitioning')
  }, 300) // Match the CSS transition duration
}

/**
 * Initialize the font from localStorage or default
 */
export function initializeFont(): void {
  const savedFont = localStorage.getItem(FONT_STORAGE_KEY) as FontFamily

  if (savedFont && ['mono', 'sans', 'serif'].includes(savedFont)) {
    setFont(savedFont)
  } else {
    setFont('mono')
  }
}

/**
 * Force a style recalculation to ensure font changes are applied
 */
function forceStyleRefresh(): void {
  // These operations force the browser to recalculate styles
  const html = document.documentElement

  // Force reflow - this is the most reliable method
  void html.offsetHeight

  // For browsers that need more convincing, force a repaint
  requestAnimationFrame(() => {
    // Force another reflow on the next frame
    void html.offsetHeight

    // This forces WebKit/Blink to redraw immediately
    window.scrollBy(0, 1)
    window.scrollBy(0, -1)

    // Ensure any transitions have the proper timing
    document.body.style.transition = 'none'
    requestAnimationFrame(() => {
      document.body.style.transition = ''
    })
  })
}
