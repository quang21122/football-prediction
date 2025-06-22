# ⚽️ Football Prediction

A comprehensive football prediction web application that provides match predictions, live scores, team statistics, and an AI-powered chatbot for football-related queries. Built with React and powered by machine learning models for accurate match outcome predictions.

## 🌟 Features

### Core Features

- **Match Predictions**: AI-powered predictions for upcoming football matches using machine learning models
- **Live Match Tracking**: Real-time updates on ongoing matches with live scores and statistics
- **Match Calendar**: Interactive calendar to browse matches by date
- **Detailed Match Information**: Comprehensive match details including:
  - Team lineups and formations
  - Head-to-head statistics
  - Recent match history
  - Post-match statistics and analysis
- **Team Management**: Browse and explore football clubs with detailed information
- **League Standings**: Real-time league tables and standings
- **AI Chatbot**: Intelligent chatbot for answering football player-related questions

### User Features

- **User Authentication**: Sign up, sign in, and profile management
- **Responsive Design**: Optimized for desktop and mobile devices
- **Multi-language Support**: Interface in Vietnamese with international data support

## 🛠️ Technology Stack

### Frontend

- **React 18.3.1** - Modern React with hooks and functional components
- **Vite 5.4.8** - Fast build tool and development server
- **React Router DOM 6.27.0** - Client-side routing
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **Styled Components 6.1.13** - CSS-in-JS styling
- **React Icons 5.3.0** - Icon library
- **Day.js 1.11.13** - Date manipulation library
- **Axios 1.7.7** - HTTP client for API requests

### Backend Services

- **Prediction API**: Local server running on `http://localhost:9000` for match predictions
- **Football API**: API-Sports.io for real-time football data
- **AI Chatbot**: External AI service for football player queries

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```text
football-prediction/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Matches/       # Match-related components
│   │   ├── calendar/      # Calendar component
│   │   ├── chatbot/       # AI chatbot interface
│   │   ├── club/          # Club-related components
│   │   ├── footer/        # Footer component
│   │   ├── headToHead/    # Head-to-head statistics
│   │   ├── lineups/       # Match lineups display
│   │   ├── matchStatistics/ # Match statistics
│   │   ├── navbar/        # Navigation bar
│   │   ├── recentMatches/ # Recent matches display
│   │   ├── signInForm/    # Authentication forms
│   │   └── standing/      # League standings
│   ├── context/           # React context providers
│   ├── pages/             # Main application pages
│   ├── assets/            # Images and static files
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── *.json                 # Data files (clubs, players, matches)
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## 🚀 Installation Instructions

### Prerequisites

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- **Git** for version control

### System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API access
- Local prediction server (for match predictions)

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd football-prediction
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add your API keys:

   ```env
   VITE_RAPIDAPI_KEY=your_api_sports_key_here
   VITE_RAPIDAPI_HOST=v3.football.api-sports.io
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

### Additional Setup (Optional)

- **Prediction Server**: Ensure the prediction API server is running on `http://localhost:9000`
- **Chatbot Service**: Configure the AI chatbot endpoint if using the chatbot feature

## 📖 Usage Guide

### Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Key Features Usage

#### 1. **Match Predictions**

- Navigate to the home page
- Select a date using the calendar
- View predicted scores for upcoming matches
- Click on any match for detailed information

#### 2. **Browse Teams**

- Go to the "Clubs" section
- Search for specific teams
- View team details, players, and statistics

#### 3. **League Standings**

- Access the "Standings" page
- Switch between different leagues
- View real-time league tables

#### 4. **AI Chatbot**

- Navigate to the chatbot section
- Ask questions about football players
- Get AI-powered responses about player statistics and information

### Input/Output Formats

#### API Endpoints

- **Predictions**: `GET /predict?date={YYYY-MM-DD}&league={leagueId}`
- **Matches**: `GET /match?league={leagueId}&from={date}&to={date}`
- **Standings**: `GET /leaderboard?league={leagueId}`

#### Date Format

- All dates use ISO format: `YYYY-MM-DD`
- Times are displayed in Vietnam timezone (Asia/Ho_Chi_Minh)

## 📊 Data Requirements

### External APIs

1. **API-Sports.io**

   - Real-time football data
   - Match fixtures and results
   - Team information and statistics
   - Player data and lineups

2. **Prediction Service**
   - Machine learning model for match predictions
   - Historical match data analysis
   - Team performance metrics

### Data Sources

- **Live Match Data**: Fetched from API-Sports.io
- **Predictions**: Generated by local ML model server
- **Static Data**: Stored in JSON files for offline functionality

### Required API Keys

- API-Sports.io API key (free tier available)
- Configure in environment variables

## 🤖 Model Information

### Prediction Algorithm

The application uses a machine learning model that analyzes:

- Historical match results
- Team performance statistics
- Head-to-head records
- Player form and availability
- Home/away advantage factors

### Prediction Accuracy

- Models are trained on historical football data
- Predictions include confidence scores
- Regular model updates improve accuracy over time

### Chatbot AI

- Specialized in football player information
- Trained on comprehensive player databases
- Provides real-time responses to player queries

## 🤝 Contributing Guidelines

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Code Standards

- Follow ESLint configuration
- Use functional components with hooks
- Maintain consistent code formatting
- Write descriptive commit messages
- Add comments for complex logic

### Testing

- Test all new features thoroughly
- Ensure responsive design works on different screen sizes
- Verify API integrations function correctly
- Check for console errors and warnings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check existing documentation
- Review the code comments for implementation details

## 🔮 Future Enhancements

- Real-time notifications for match updates
- Enhanced prediction models with more data sources
- Mobile application development
- Social features for user interactions
- Advanced analytics and visualizations

---

**Note**: This application requires active internet connection for real-time data and predictions. Ensure all API services are properly configured before use.
