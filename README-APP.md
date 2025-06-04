# QuickBet - Live Sports Betting App

The fastest way to bet on live sports! See matches, tap your prediction, and you're done. No complicated forms, just instant betting.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** at `http://localhost:3000`

Or use the start script:
```bash
chmod +x start.sh
./start.sh
```

## 🎮 How It Works

### Super Simple Betting
1. **See a match** with live scores and one question
2. **Tap your prediction** - instantly added to bet slip ✓
3. **Changed your mind?** Tap again to remove
4. **Swipe left/right** to browse 8+ matches
5. **Tap the green button** to place all bets at once

### What Makes It Special
- **One-tap betting** - No forms or confirmations
- **Smart questions** - Designed to trigger instant "yes/no" reactions
- **Visual feedback** - Green pulse when adding, checkmark when selected
- **Mix of matches** - Live games and upcoming kickoffs
- **Big celebration** - Fun animation when you place bets 🎉

## 📱 Features

### Match Cards
- Live scores and match status
- Single compelling question per match
- Two-option predictions with odds
- Visual selection indicator

### Smart Navigation
- Swipe between matches
- Progress bar shows your position
- Previous/Next hints at bottom

### Bet Slip
- Floating button with bet count
- Quick stake adjustment ($10, $25, $50, $100)
- Total stake and potential winnings
- Success animation on placement

## 🎯 Example Questions

Instead of complex betting options, we ask simple questions like:
- "Manchester United will hold on to win"
- "This match will see 3+ goals"
- "Warriors will extend their lead"
- "First goal before 30 minutes"

## 💡 Pro Tips

- Build multi-bets across different matches
- Green checkmark = already in your bet slip
- Tap the same option to remove it
- Watch for the pulse animation when adding
- Check odds before confirming

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite for instant reloads
- Tailwind CSS for styling
- Swipe gestures for navigation
- Smooth animations throughout

## 📁 Project Structure

```
quickbet/
├── src/
│   ├── components/     # UI components
│   ├── types/          # TypeScript types
│   ├── utils/          # Data loaders
│   └── styles/         # CSS files
├── public/data/        # Mock match data
└── docs/               # Documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development
- `npm run build` - Production build
- `npm test` - Run tests
- `./fix-css.sh` - Fix styling issues

## 🎨 Design Philosophy

- **Instant gratification** - See it, tap it, done
- **Reduce friction** - Minimum taps to place bet
- **Visual delight** - Animations make it fun
- **Mobile first** - Designed for one-handed use

## 📝 License

MIT - Feel free to customize!