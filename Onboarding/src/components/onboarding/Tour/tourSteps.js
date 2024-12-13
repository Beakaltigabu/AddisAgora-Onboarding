export const tourSteps = [
  {
    id: 'nav-intro',
    target: '.floating-nav',
    message: "Let's explore how to navigate through AddisAgora",
    position: { right: '120px', top: '20px' },
    cursorPosition: { x: window.innerWidth - 80, y: 40 },
    action: 'hover',
    delay: 2000
  },
  {
    id: 'nav-click',
    target: '.floating-nav',
    message: "Click to open the navigation menu",
    position: { right: '120px', top: '20px' },
    cursorPosition: { x: window.innerWidth - 80, y: 40 },
    action: 'click',
    delay: 2500
  },
  {
    id: 'nav-education',
    target: '[data-section="educational"]',
    message: "Click 'Education' to explore our learning paths",
    position: { right: '120px', top: '120px' },
    cursorPosition: { x: window.innerWidth - 80, y: 120 },
    action: 'click',
    delay: 3000
  },
  {
    id: 'educational',
    target: '#educational',
    preMessage: "Scrolling to Educational Journey section...",
    message: "Here you'll find structured learning paths designed for your growth",
    position: { right: '120px', top: '50%' },
    scroll: true,
    scrollOptions: { offsetY: 100 },
    simulateHover: true,
    delay: 4000
  },
  {
    id: 'nav-roles',
    target: '[data-section="roles"]',
    message: "Let's check out the different roles you can take on",
    position: { right: '120px', top: '160px' },
    cursorPosition: { x: window.innerWidth - 80, y: 160 },
    action: 'click',
    delay: 3000
  },
  {
    id: 'roles-section',
    target: '#roles',
    scroll: true,
    message: "Explore various roles to enhance your skills",
    simulateHover: true,
    delay: 4000
  },
  {
    id: 'nav-community',
    target: '[data-section="community"]',
    message: "Next, let's explore our community",
    action: 'click',
    delay: 3000
  },
  {
    id: 'community-section',
    target: '#community',
    scroll: true,
    message: "Connect with fellow members and grow together",
    simulateHover: true,
    delay: 4000
  },
  {
    id: 'nav-improvement',
    target: '[data-section="improvement"]',
    message: "Let's see how you can track your progress",
    action: 'click',
    delay: 3000
  },
  {
    id: 'improvement-section',
    target: '#improvement',
    scroll: true,
    message: "Monitor and celebrate your growth journey",
    simulateHover: true,
    delay: 4000
  },
  {
    id: 'nav-recognition',
    target: '[data-section="recognition"]',
    message: "Discover our recognition system",
    action: 'click',
    delay: 3000
  },
  {
    id: 'recognition-section',
    target: '#recognition',
    scroll: true,
    message: "Earn badges and certificates as you progress",
    simulateHover: true,
    delay: 4000
  },
  {
    id: 'nav-getting-started',
    target: '[data-section="getting-started"]',
    message: "Finally, let's see how to get started",
    action: 'click',
    delay: 3000
  },
  {
    id: 'getting-started-section',
    target: '#getting-started',
    scroll: true,
    message: "Take your first steps in your AddisAgora journey",
    simulateHover: true,
    delay: 4000
  },
  {
    id: 'tour-completion',
    target: 'body',
    message: "You're all set to begin your journey!",
    position: { left: '50%', top: '50%' },
    scroll: true,
    scrollOptions: { y: 0, duration: 2 },
    delay: 3000
  }
];
