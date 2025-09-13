# Social Media Follower Counter - Frontend

A modern, responsive React frontend for tracking social media follower counts from Instagram, LinkedIn, and X (Twitter).

## Features

- 🎨 Modern, clean UI with glassmorphism design
- 📱 Fully responsive design for all devices
- ⚡ Real-time follower count fetching
- 🎯 Support for Instagram, LinkedIn, and X (Twitter)
- 🔄 Loading states and error handling
- 📊 Formatted follower counts (1.2K, 1.5M format)
- 🎭 Platform-specific icons and branding

## Technologies Used

- **React 18** - Modern React with hooks
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Modern styling with gradients and animations
- **Inter Font** - Clean, professional typography

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - Navigate to http://localhost:3000
   - Make sure the backend is running on http://localhost:8000

## Usage

1. **Enter Social Media Usernames:**
   - Instagram: `elonmusk`
   - LinkedIn: `charlie-bowsher-21380112b`
   - X (Twitter): `elonmusk`

2. **Submit the form:**
   - Click "Get Follower Counts"
   - Wait for the API to fetch the data

3. **View Results:**
   - See formatted follower counts
   - Each platform shows with its distinctive branding
   - Error messages display if usernames are invalid

## Design Features

### Visual Design
- **Glassmorphism Effect:** Semi-transparent cards with backdrop blur
- **Gradient Backgrounds:** Beautiful purple-to-blue gradients
- **Platform Branding:** Instagram gradient, LinkedIn blue, Twitter blue
- **Smooth Animations:** Hover effects and loading states

### User Experience
- **Form Validation:** Ensures at least one username is provided
- **Loading States:** Clear feedback during API calls
- **Error Handling:** Helpful error messages for failed requests
- **Responsive Design:** Works perfectly on mobile and desktop

### Typography & Spacing
- **Inter Font:** Professional, readable typography
- **Consistent Spacing:** 8px grid system for perfect alignment
- **Visual Hierarchy:** Clear distinction between headers, body text, and data

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js             # Main React component
│   ├── App.css            # Component-specific styles
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## API Integration

The frontend communicates with the FastAPI backend at `http://localhost:8000`:

- **Endpoint:** `POST /followers`
- **Request:** JSON with social media usernames
- **Response:** Follower counts and user data

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Performance

- **Fast Loading:** Optimized React components
- **Efficient API Calls:** Only sends non-empty usernames
- **Smooth Animations:** Hardware-accelerated CSS transitions
- **Responsive Images:** Optimized for all screen sizes 