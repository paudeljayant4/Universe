* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Georgia', serif;
}

body {
  overflow: hidden;
  background: #000;
  position: relative;
}

/* Canvas layers */
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#stars {
  z-index: 1;
}

#nebula {
  z-index: 2;
  opacity: 0.6;
}

#galaxy {
  z-index: 3;
}

/* Text overlay */
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
  padding: 20px;
  z-index: 10;
}

#text {
  color: white;
  font-size: 1.8rem;
  opacity: 0;
  transition: opacity 2.5s ease;
  max-width: 90%;
  line-height: 1.6;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  font-weight: 300;
  letter-spacing: 1px;
}

#name {
  color: white;
  font-size: 4rem;
  margin-top: 30px;
  opacity: 0;
  text-shadow: 
    0 0 20px rgba(255, 255, 255, 0.8),
    0 0 40px rgba(200, 150, 255, 0.6),
    0 0 60px rgba(150, 100, 255, 0.4);
  transition: opacity 3s ease, transform 2s ease;
  font-weight: 400;
  letter-spacing: 8px;
  animation: namePulse 4s ease-in-out infinite;
}

@keyframes namePulse {
  0%, 100% {
    text-shadow: 
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 40px rgba(200, 150, 255, 0.6),
      0 0 60px rgba(150, 100, 255, 0.4);
  }
  50% {
    text-shadow: 
      0 0 30px rgba(255, 255, 255, 1),
      0 0 60px rgba(200, 150, 255, 0.8),
      0 0 90px rgba(150, 100, 255, 0.6);
  }
}

/* Start prompt for mobile audio */
#startPrompt {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #1a1a3a 0%, #000 80%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  transition: opacity 1s ease;
}

#startPrompt.hidden {
  opacity: 0;
  pointer-events: none;
}

.prompt-content {
  text-align: center;
  color: white;
  animation: promptPulse 2s ease-in-out infinite;
}

.prompt-content h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.prompt-content p {
  font-size: 1.2rem;
  opacity: 0.8;
}

@keyframes promptPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

/* Constellation dots */
.constellation-dot {
  position: fixed;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px white;
  z-index: 5;
  opacity: 0;
  transition: opacity 1s ease;
}

.constellation-line {
  position: fixed;
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.6) 50%, 
    rgba(255, 255, 255, 0) 100%);
  z-index: 4;
  opacity: 0;
  transform-origin: left center;
  transition: opacity 1s ease;
}

/* Mobile responsive */
@media (max-width: 768px) {
  #text { 
    font-size: 1.2rem;
    line-height: 1.5;
  }
  #name { 
    font-size: 2.5rem;
    letter-spacing: 4px;
  }
  .prompt-content h2 {
    font-size: 1.5rem;
  }
  .prompt-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  #text { 
    font-size: 1rem;
  }
  #name { 
    font-size: 2rem;
    letter-spacing: 3px;
  }
}

/* Fade animations */
.fade-in {
  animation: fadeIn 2s ease forwards;
}

.fade-out {
  animation: fadeOut 2s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Kiss emojis */
.kiss {
  position: fixed;
  font-size: 2rem;
  opacity: 0;
  z-index: 100;
  pointer-events: none;
  animation: kissFloat 3s ease-out forwards;
}

@keyframes kissFloat {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 1;
    transform: translateY(-200px) scale(1) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-400px) scale(1.5) rotate(360deg);
  }
}

@media (max-width: 768px) {
  .kiss {
    font-size: 1.5rem;
  }
  
  @keyframes kissFloat {
    0% {
      opacity: 0;
      transform: translateY(0) scale(0.5) rotate(0deg);
    }
    10% {
      opacity: 1;
    }
    50% {
      opacity: 1;
      transform: translateY(-150px) scale(1) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-300px) scale(1.5) rotate(360deg);
    }
  }
}
