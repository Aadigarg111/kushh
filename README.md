# 🏨 LuxStay - Ultra-Modern Hotel Booking Website

A cutting-edge hotel booking platform featuring 3D effects, AI-powered features, and an immersive user experience built with React, TypeScript, and modern web technologies.

![LuxStay Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=LuxStay+Preview)

## ✨ Features

### 🎨 Visual & UI
- **3D Interactive Globe** - Rotating background with floating elements
- **Glassmorphism Design** - Modern glass-like UI components
- **Parallax Scrolling** - Layered depth effects
- **Dark/Light Mode Toggle** - Smooth theme transitions
- **Animated Microinteractions** - Button ripples, hover effects, and loading animations

### 🧭 Navigation & Layout
- **Floating Sidebar Menu** - Expandable navigation with icons
- **Sticky Smart Search Bar** - Adaptive search with voice input
- **Multi-tab Homepage** - Explore, Deals, Luxury, and Last Minute sections
- **Voice Search Integration** - Speak to search destinations

### 🔍 Search & Filters
- **3D Destination Explorer** - Interactive map with hotel pins
- **Smart Filters Panel** - Budget, star rating, amenities, room types
- **AI-curated Tags** - Instagrammable, Hidden Gems, Walkable
- **Live Preview Mode** - Instant hotel thumbnail updates

### 🏨 Hotel Listings
- **3D Flip Cards** - Hover to reveal hotel highlights
- **Dynamic Pricing Tags** - Price trends and surge alerts
- **Virtual Tour Button** - 360° room walkthroughs
- **Save & Compare Feature** - Side-by-side hotel comparison

### 🤖 Smart Features
- **AI Travel Planner** - Personalized itinerary suggestions
- **Personalized Dashboard** - Loyalty points and trip tracking
- **Smart Notifications** - Deal alerts and travel advisories
- **Multilingual Support** - Auto-detect language preferences

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxstay-hotel-booking.git
   cd luxstay-hotel-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Create React App
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### Option 3: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/luxstay-hotel-booking)

**Note**: The project is configured with `vercel.json` for optimal deployment settings.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **React Router** - Client-side routing

### 3D & Graphics
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber

### State Management
- **Zustand** - Lightweight state management
- **React Query** - Server state management

### UI Components
- **Lucide React** - Beautiful & consistent icon toolkit
- **React Hook Form** - Performant forms with easy validation
- **React Hot Toast** - Elegant toast notifications

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/              # 3D components (Globe, etc.)
│   ├── hotels/          # Hotel-related components
│   ├── search/          # Search functionality
│   ├── destinations/    # Destination components
│   ├── layout/          # Layout components (Header, Sidebar)
│   └── ui/              # Reusable UI components
├── pages/               # Page components
├── stores/              # Zustand state stores
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🎯 Key Components

### 3D Globe (`src/components/3d/Globe3D.tsx`)
Interactive 3D globe with rotating animation and floating elements.

### Hotel Card (`src/components/hotels/HotelCard.tsx`)
3D flip cards with glassmorphism design and interactive elements.

### Search Bar (`src/components/search/SearchBar.tsx`)
Advanced search with voice input, filters, and smart suggestions.

### Header (`src/components/layout/Header.tsx`)
Sticky header with glassmorphism design and adaptive search.

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Luxury**: Purple gradient (`#d946ef` to `#c026d3`)
- **Glass**: Semi-transparent whites and blacks

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)

### Animations
- **Float**: Gentle floating animation
- **Glow**: Pulsing glow effects
- **Slide**: Smooth slide transitions
- **Scale**: Interactive scale effects

## 🔧 Configuration

### Tailwind CSS
Custom configuration with glassmorphism utilities and luxury gradients.

### Framer Motion
Pre-configured animations for smooth user interactions.

### Three.js
Optimized 3D rendering with proper lighting and materials.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy-loaded components
- **Image Optimization** - Responsive images with proper sizing
- **3D Performance** - Optimized Three.js rendering
- **Bundle Optimization** - Tree shaking and minification

## 🔮 Future Enhancements

- [ ] **AR Room Preview** - Augmented reality hotel room visualization
- [ ] **AI Chatbot** - Intelligent booking assistant
- [ ] **Social Features** - Share trips and hotel recommendations
- [ ] **Offline Mode** - PWA capabilities for offline access
- [ ] **Multi-language** - Internationalization support
- [ ] **Payment Integration** - Secure payment processing
- [ ] **Real-time Chat** - Live concierge support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** for 3D graphics capabilities
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first approach
- **Lucide** for beautiful icons
- **Unsplash** for high-quality images

## 📞 Support

For support, email support@luxstay.com or join our Slack channel.

---

**Built with ❤️ by the LuxStay Team**
