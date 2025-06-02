# QuickBet - Live Sports Betting Questions

A mobile-first sports betting app that generates real-time questions about ongoing matches. Users swipe through live games and place quick bets on what happens next.

![Status](https://img.shields.io/badge/Stage-Prototype-orange)
![Mobile](https://img.shields.io/badge/Platform-Mobile%20Web-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Core Concept

Instead of traditional match outcome betting, QuickBet creates dynamic, contextual questions about live matches:
- "How many goals in the next 10 minutes?"
- "Next team to score?"
- "Total corners before halftime?"

**Key USP**: Swipe through matches, tap for questions, bet in seconds.

## 🏗️ Architecture

### Modular Design
The app is built with swappable modules to ensure flexibility:

```
Core Domain (Never Changes)
    ├── Entities (Match, Bet, User)
    ├── Use Cases (PlaceBet, GetQuestions)
    └── Business Rules

Swappable Modules
    ├── Data Providers (TheSportsDB → ESPN → Custom)
    ├── Question Engine (Football, Basketball, Tennis)
    ├── Odds Calculator (Fixed → Probability → ML)
    └── Content Manager (JSON → CMS)
```

### Current Implementation Status

| Module | Status | Implementation |
|--------|--------|----------------|
| Core Domain | ✅ Designed | Interfaces defined |
| Data Provider | 🟡 Prototype | JSON files |
| Question Engine | 🟡 Prototype | Static templates |
| UI Components | ⏳ Planned | React + Tailwind |
| Compliance | 🔵 Placeholder | Interfaces only |
| Security | 🔵 Placeholder | Interfaces only |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/edmondmiu/quickbet.git
cd quickbet

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

## 📁 Project Structure

```
quickbet/
├── src/
│   ├── modules/
│   │   ├── core/           # Domain logic (don't modify)
│   │   ├── data-providers/ # Match data sources
│   │   ├── question-engine/# Question generation
│   │   └── odds-engine/    # Odds calculation
│   ├── components/         # React components
│   ├── hooks/             # React hooks
│   └── pages/             # App pages
├── data/                  # JSON mock data
├── docs/                  # Documentation
└── tests/                 # Test suites
```

## 🎨 Design Philosophy

**Emotional Design**: Every interaction celebrates the user
- Pulsing borders for live matches
- Confetti bursts on bet placement
- Growing numbers as confidence builds
- Haptic-like feedback on interactions

**Color Palette**:
- Electric Green (#00FF88) - Wins & success
- Hot Pink (#FF0080) - Live energy
- Deep Purple (#7B3FF2) - Premium bets
- Midnight Blue (#0A0E27) - Background

## 🔌 Module System

### Adding a New Data Provider
```typescript
// 1. Implement the interface
export class ESPNProvider implements IDataProvider {
  async getMatches(): Promise<Match[]> {
    // Your implementation
  }
}

// 2. Register in config
export const moduleConfig = {
  dataProvider: {
    providers: {
      espn: () => import('./ESPNProvider')
    }
  }
}
```

### Adding a New Sport
```typescript
// 1. Create question generator
export class TennisQuestionGenerator implements IQuestionGenerator {
  sport = SportType.TENNIS
  generate(match: Match): Question[] {
    // Tennis-specific questions
  }
}

// 2. Register with engine
questionEngine.registerGenerator(new TennisQuestionGenerator())
```

## 📊 Current Data Source

**Development**: Static JSON files in `/data`
- `matches.json` - Mock live matches
- `questions.json` - Question templates
- `users.json` - Test user profiles

**Future**: TheSportsDB API → Custom real-time feed

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests (when UI is ready)
npm run test:e2e
```

## 🚧 Roadmap

### Phase 1: MVP (Current)
- [x] Architecture design
- [x] Module interfaces
- [x] JSON data structure
- [ ] Core React components
- [ ] Basic betting flow
- [ ] Swipe navigation

### Phase 2: Live Data
- [ ] TheSportsDB integration
- [ ] WebSocket updates
- [ ] Dynamic question generation
- [ ] Real odds calculation

### Phase 3: Production Features
- [ ] User authentication
- [ ] Payment integration
- [ ] Compliance modules
- [ ] Monitoring & analytics

## 🤝 Contributing

1. Check `/docs/CONTRIBUTING.md` for guidelines
2. Use module interfaces - don't modify core domain
3. Add tests for new features
4. Follow the established patterns

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Module Development](./docs/MODULES.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## ⚖️ Legal Notice

This is a prototype for educational purposes. Real-money gambling requires proper licenses and compliance with local regulations.

## 📝 License

MIT License - see [LICENSE](./LICENSE) file

---

**Current Stage**: 🏗️ Architecture complete, building UI components