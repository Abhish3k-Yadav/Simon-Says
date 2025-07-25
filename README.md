# 🎮 Simon Says Game

A modern, responsive implementation of the classic Simon Says memory game built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

- **🎯 Classic Gameplay**: Test your memory by repeating sequences of colored buttons
- **🔊 Sound Effects**: Each button has a unique musical note for audio feedback
- **📱 Fully Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- **🎚️ Difficulty Levels**: Easy (1.2s), Normal (0.8s), and Hard (0.5s) modes
- **🏆 High Score Tracking**: Your best score is saved locally
- **⌨️ Keyboard Support**: Play with keyboard (1-4 or Q-W-A-S keys)
- **📱 Touch Optimized**: Smooth touch interactions for mobile devices
- **🎨 Beautiful UI**: Modern gradient design with smooth animations

## 🚀 Demo

Play the game live: [Open index.html in your browser]

## 📱 Screenshots

### Desktop View

- Clean, modern interface with gradient background
- Four colored buttons arranged in a 2x2 grid
- Score display and difficulty selector

### Mobile View

- Responsive design that adapts to smaller screens
- Touch-friendly button sizes
- Optimized layout for portrait and landscape modes

## 🎮 How to Play

1. **Start the Game**: Click the "🚀 Start Game" button or press the spacebar
2. **Watch the Sequence**: The game will flash a sequence of colored buttons
3. **Repeat the Pattern**: Click the buttons in the same order
4. **Level Up**: Each level adds one more button to the sequence
5. **Game Over**: Make a mistake and try to beat your high score!

### Controls

- **Mouse/Touch**: Click or tap the colored buttons
- **Keyboard**:
  - `1` = Red button
  - `2` = Yellow button
  - `3` = Green button
  - `4` = Purple button
  - Alternative: `Q`, `W`, `A`, `S` keys
  - `Space` = Start/Restart game

## 🛠️ Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Abhish3k-Yadav/Simon-Says.git
   cd Simon-Says
   ```

2. **Open the game**:
   - Simply open `index.html` in any modern web browser
   - No build process or server required!

## 📁 Project Structure

```text
Simon-Says/
├── index.html          # Main HTML file
├── Style.css          # Styles and responsive design
├── app.js             # Game logic and functionality
└── README.md          # Project documentation
```

## 🔧 Technical Details

### Built With

- **HTML5**: Semantic markup and accessibility features
- **CSS3**:
  - CSS Grid and Flexbox for layout
  - CSS animations and transitions
  - Media queries for responsive design
  - Modern gradient backgrounds
- **Vanilla JavaScript**:
  - Web Audio API for sound effects
  - Local Storage for high score persistence
  - Touch and keyboard event handling
  - Responsive event listeners

### Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features

- **Lightweight**: No external dependencies
- **Fast Loading**: Optimized CSS and JavaScript
- **Memory Efficient**: Clean event listener management
- **Touch Optimized**: Prevents zoom and provides haptic feedback

## 🎨 Customization

### Changing Colors

Edit the CSS gradient values in `Style.css`:

```css
.red { background: linear-gradient(135deg, #fd79a8, #e84393); }
.yellow { background: linear-gradient(135deg, #ffeaa7, #fdcb6e); }
.green { background: linear-gradient(135deg, #55efc4, #00cec9); }
.purple { background: linear-gradient(135deg, #a29bfe, #6c5ce7); }
```

### Adjusting Difficulty

Modify the game speed in `app.js`:

```javascript
let gameSpeed = {
  easy: 1200,    // milliseconds
  normal: 800,
  hard: 500,
};
```

### Sound Frequencies

Change button sounds by editing the frequencies in `app.js`:

```javascript
const buttonSounds = {
  red: 261.63,    // C4
  yellow: 329.63, // E4
  green: 392.0,   // G4
  purple: 523.25, // C5
};
```

## 🐛 Known Issues

- Web Audio API requires user interaction to start (browser security feature)
- Some older mobile browsers may have limited audio support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Abhishek Yadav**

- GitHub: [@Abhish3k-Yadav](https://github.com/Abhish3k-Yadav)

## 🙏 Acknowledgments

- Inspired by the classic Simon electronic game
- Sound design using Web Audio API
- Responsive design principles for modern web applications

## 📈 Future Enhancements

- [ ] Multiplayer mode
- [ ] Different sound themes
- [ ] Animation effects
- [ ] Leaderboard system
- [ ] Different button layouts
- [ ] Color blind accessibility options

---

Enjoy playing Simon Says! 🎮✨
