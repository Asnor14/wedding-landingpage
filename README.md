# Wedding Website

An elegant wedding invitation landing page built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Video Hero Section** - Fullscreen hero with multiple videos and smooth crossfade transitions
- **Animated Butterfly** - Follows scroll and lands next to the invitation title
- **Story Section** - Romantic love story with timeline and animated content
- **Photo Carousel** - Auto-scrolling gallery with pause on hover
- **Invitation Modal** - Clickable envelope that reveals wedding details
- **Responsive Design** - Looks great on desktop and mobile

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── components/
│   ├── Butterfly.tsx           # Animated SVG butterfly
│   ├── ButterflyScroll.tsx     # Scroll-following butterfly logic
│   ├── HeroSection.tsx         # Video hero with couple names
│   ├── StorySection.tsx        # Love story with timeline
│   ├── PhotoCarousel.tsx       # Auto-scrolling photo gallery
│   ├── InvitationEnvelopeSection.tsx  # Clickable envelope
│   └── InvitationModal.tsx     # Wedding invitation popup
├── globals.css                 # Global styles and theme colors
├── layout.tsx                  # Root layout with fonts
└── page.tsx                    # Main page composition
public/
├── videos/
│   ├── hero-wedding.mp4        # Hero background video 1
│   └── hero-wedding2.mp4       # Hero background video 2
└── photos/
    └── photo-1.jpg to photo-6.jpg  # Gallery images
```

## Customization

### Couple Names & Date

Edit the props in `app/page.tsx`:

```tsx
<HeroSection
  coupleName="Your Names"
  weddingDate="Your Date"
  invitationText="Your invitation text"
/>
```

### Videos

Replace the MP4 files in `public/videos/`:
- `hero-wedding.mp4`
- `hero-wedding2.mp4`

### Photos

Add your photos to `public/photos/`:
- `photo-1.jpg` through `photo-6.jpg`

### Colors

The wedding theme colors are defined in `app/globals.css`:

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Brown | `#4A3728` | Headers, text |
| Muted Gold | `#C9A962` | Accents, decorations |
| Dusty Rose | `#B76E79` | Highlights, hearts |
| Soft Beige | `#F5F0E8` | Section backgrounds |
| Blush Pink | `#E8D5D3` | Envelope section |

## License

MIT
