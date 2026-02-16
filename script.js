// Canvas setup
const starsCanvas = document.getElementById("stars");
const nebulaCanvas = document.getElementById("nebula");
const galaxyCanvas = document.getElementById("galaxy");

const starsCtx = starsCanvas.getContext("2d");
const nebulaCtx = nebulaCanvas.getContext("2d");
const galaxyCtx = galaxyCanvas.getContext("2d");

const text = document.getElementById("text");
const nameEl = document.getElementById("name");
const music = document.getElementById("bgMusic");
const startPrompt = document.getElementById("startPrompt");

// Responsive canvas sizing
function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  [starsCanvas, nebulaCanvas, galaxyCanvas].forEach(canvas => {
    canvas.width = width;
    canvas.height = height;
  });
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star field with depth
class Star {
  constructor() {
    this.reset();
    this.y = Math.random() * starsCanvas.height;
  }
  
  reset() {
    this.x = Math.random() * starsCanvas.width;
    this.y = -10;
    this.z = Math.random() * 3; // depth layers
    this.radius = Math.random() * 1.5 + 0.5;
    this.speed = Math.random() * 0.3 + 0.1;
    this.twinkle = Math.random() * Math.PI * 2;
  }
  
  update() {
    this.y += this.speed * (1 + this.z * 0.5);
    this.twinkle += 0.02;
    
    if (this.y > starsCanvas.height) {
      this.reset();
    }
  }
  
  draw() {
    const opacity = 0.3 + Math.sin(this.twinkle) * 0.3;
    starsCtx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    starsCtx.beginPath();
    starsCtx.arc(this.x, this.y, this.radius / (1 + this.z), 0, Math.PI * 2);
    starsCtx.fill();
    
    // Add glow for closer stars
    if (this.z < 1) {
      starsCtx.shadowBlur = 10;
      starsCtx.shadowColor = "white";
      starsCtx.fill();
      starsCtx.shadowBlur = 0;
    }
  }
}

// Nebula particles
class NebulaParticle {
  constructor() {
    this.x = Math.random() * nebulaCanvas.width;
    this.y = Math.random() * nebulaCanvas.height;
    this.size = Math.random() * 100 + 50;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.2;
    this.hue = Math.random() * 60 + 240; // Purple to blue range
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < -this.size) this.x = nebulaCanvas.width + this.size;
    if (this.x > nebulaCanvas.width + this.size) this.x = -this.size;
    if (this.y < -this.size) this.y = nebulaCanvas.height + this.size;
    if (this.y > nebulaCanvas.height + this.size) this.y = -this.size;
  }
  
  draw() {
    const gradient = nebulaCtx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0.15)`);
    gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 50%, 0.05)`);
    gradient.addColorStop(1, `hsla(${this.hue}, 60%, 40%, 0)`);
    
    nebulaCtx.fillStyle = gradient;
    nebulaCtx.fillRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
  }
}

// Galaxy swirl effect
class GalaxyParticle {
  constructor(centerX, centerY, angle, distance) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.angle = angle;
    this.distance = distance;
    this.speed = 0.002 + (Math.random() * 0.001);
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.8 + 0.2;
  }
  
  update() {
    this.angle += this.speed;
    
    // Spiral effect
    const spiral = this.angle * 0.5;
    this.x = this.centerX + Math.cos(this.angle + spiral) * this.distance;
    this.y = this.centerY + Math.sin(this.angle + spiral) * this.distance;
  }
  
  draw() {
    galaxyCtx.fillStyle = `rgba(255, 200, 255, ${this.opacity})`;
    galaxyCtx.beginPath();
    galaxyCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    galaxyCtx.fill();
    
    galaxyCtx.shadowBlur = 5;
    galaxyCtx.shadowColor = "rgba(255, 150, 255, 0.5)";
    galaxyCtx.fill();
    galaxyCtx.shadowBlur = 0;
  }
}

// Initialize particles
const stars = Array.from({ length: 250 }, () => new Star());
const nebulaParticles = Array.from({ length: 8 }, () => new NebulaParticle());
let galaxyParticles = [];
let galaxyActive = false;

// Animation loop
function animate() {
  // Clear canvases
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  nebulaCtx.clearRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
  
  // Draw nebula
  nebulaParticles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  // Draw stars
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  
  // Draw galaxy if active
  if (galaxyActive) {
    galaxyCtx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
    galaxyParticles.forEach(particle => {
      particle.update();
      particle.draw();
    });
  }
  
  requestAnimationFrame(animate);
}

// Text control
function showText(content, duration = 10000) {
  text.innerHTML = content;
  text.style.opacity = 1;
  
  setTimeout(() => {
    text.style.opacity = 0;
  }, duration);
}

// Create galaxy swirl
function createGalaxy() {
  galaxyActive = true;
  const centerX = galaxyCanvas.width / 2;
  const centerY = galaxyCanvas.height / 2;
  
  galaxyParticles = [];
  for (let i = 0; i < 500; i++) {
    const angle = (i / 500) * Math.PI * 8;
    const distance = (i / 500) * 300 + 50;
    galaxyParticles.push(new GalaxyParticle(centerX, centerY, angle, distance));
  }
}

// Create constellation for name "HIMANI" - Much denser with more stars
function createConstellation() {
  const centerX = starsCanvas.width / 2;
  const centerY = starsCanvas.height / 2;
  const scale = window.innerWidth < 768 ? 0.6 : 1; // Scale for mobile
  
  // Dense constellation points for H I M A N I (3x more points per letter)
  const constellationPoints = [
    // H - vertical left
    { x: centerX - 250 * scale, y: centerY - 50 * scale },
    { x: centerX - 250 * scale, y: centerY - 35 * scale },
    { x: centerX - 250 * scale, y: centerY - 20 * scale },
    { x: centerX - 250 * scale, y: centerY - 5 * scale },
    { x: centerX - 250 * scale, y: centerY + 10 * scale },
    { x: centerX - 250 * scale, y: centerY + 25 * scale },
    { x: centerX - 250 * scale, y: centerY + 40 * scale },
    { x: centerX - 250 * scale, y: centerY + 50 * scale },
    // H - horizontal
    { x: centerX - 240 * scale, y: centerY },
    { x: centerX - 230 * scale, y: centerY },
    { x: centerX - 220 * scale, y: centerY },
    { x: centerX - 210 * scale, y: centerY },
    // H - vertical right
    { x: centerX - 200 * scale, y: centerY - 50 * scale },
    { x: centerX - 200 * scale, y: centerY - 35 * scale },
    { x: centerX - 200 * scale, y: centerY - 20 * scale },
    { x: centerX - 200 * scale, y: centerY - 5 * scale },
    { x: centerX - 200 * scale, y: centerY + 10 * scale },
    { x: centerX - 200 * scale, y: centerY + 25 * scale },
    { x: centerX - 200 * scale, y: centerY + 40 * scale },
    { x: centerX - 200 * scale, y: centerY + 50 * scale },
    
    // I - vertical
    { x: centerX - 150 * scale, y: centerY - 50 * scale },
    { x: centerX - 150 * scale, y: centerY - 35 * scale },
    { x: centerX - 150 * scale, y: centerY - 20 * scale },
    { x: centerX - 150 * scale, y: centerY - 5 * scale },
    { x: centerX - 150 * scale, y: centerY + 10 * scale },
    { x: centerX - 150 * scale, y: centerY + 25 * scale },
    { x: centerX - 150 * scale, y: centerY + 40 * scale },
    { x: centerX - 150 * scale, y: centerY + 50 * scale },
    
    // M - left vertical
    { x: centerX - 100 * scale, y: centerY + 50 * scale },
    { x: centerX - 100 * scale, y: centerY + 35 * scale },
    { x: centerX - 100 * scale, y: centerY + 20 * scale },
    { x: centerX - 100 * scale, y: centerY + 5 * scale },
    { x: centerX - 100 * scale, y: centerY - 10 * scale },
    { x: centerX - 100 * scale, y: centerY - 25 * scale },
    { x: centerX - 100 * scale, y: centerY - 40 * scale },
    { x: centerX - 100 * scale, y: centerY - 50 * scale },
    // M - left diagonal
    { x: centerX - 92 * scale, y: centerY - 35 * scale },
    { x: centerX - 84 * scale, y: centerY - 20 * scale },
    { x: centerX - 76 * scale, y: centerY - 5 * scale },
    // M - center
    { x: centerX - 75 * scale, y: centerY },
    // M - right diagonal
    { x: centerX - 68 * scale, y: centerY - 5 * scale },
    { x: centerX - 60 * scale, y: centerY - 20 * scale },
    { x: centerX - 52 * scale, y: centerY - 35 * scale },
    // M - right vertical
    { x: centerX - 50 * scale, y: centerY - 50 * scale },
    { x: centerX - 50 * scale, y: centerY - 40 * scale },
    { x: centerX - 50 * scale, y: centerY - 25 * scale },
    { x: centerX - 50 * scale, y: centerY - 10 * scale },
    { x: centerX - 50 * scale, y: centerY + 5 * scale },
    { x: centerX - 50 * scale, y: centerY + 20 * scale },
    { x: centerX - 50 * scale, y: centerY + 35 * scale },
    { x: centerX - 50 * scale, y: centerY + 50 * scale },
    
    // A - left diagonal
    { x: centerX + 20 * scale, y: centerY + 50 * scale },
    { x: centerX + 22 * scale, y: centerY + 35 * scale },
    { x: centerX + 24 * scale, y: centerY + 20 * scale },
    { x: centerX + 26 * scale, y: centerY + 5 * scale },
    { x: centerX + 28 * scale, y: centerY - 10 * scale },
    { x: centerX + 30 * scale, y: centerY - 25 * scale },
    { x: centerX + 32 * scale, y: centerY - 40 * scale },
    { x: centerX + 35 * scale, y: centerY - 50 * scale },
    // A - horizontal bar
    { x: centerX + 25 * scale, y: centerY + 10 * scale },
    { x: centerX + 30 * scale, y: centerY + 10 * scale },
    { x: centerX + 35 * scale, y: centerY + 10 * scale },
    { x: centerX + 40 * scale, y: centerY + 10 * scale },
    { x: centerX + 45 * scale, y: centerY + 10 * scale },
    // A - right diagonal
    { x: centerX + 38 * scale, y: centerY - 40 * scale },
    { x: centerX + 40 * scale, y: centerY - 25 * scale },
    { x: centerX + 42 * scale, y: centerY - 10 * scale },
    { x: centerX + 44 * scale, y: centerY + 5 * scale },
    { x: centerX + 46 * scale, y: centerY + 20 * scale },
    { x: centerX + 48 * scale, y: centerY + 35 * scale },
    { x: centerX + 50 * scale, y: centerY + 50 * scale },
    
    // N - left vertical
    { x: centerX + 100 * scale, y: centerY + 50 * scale },
    { x: centerX + 100 * scale, y: centerY + 35 * scale },
    { x: centerX + 100 * scale, y: centerY + 20 * scale },
    { x: centerX + 100 * scale, y: centerY + 5 * scale },
    { x: centerX + 100 * scale, y: centerY - 10 * scale },
    { x: centerX + 100 * scale, y: centerY - 25 * scale },
    { x: centerX + 100 * scale, y: centerY - 40 * scale },
    { x: centerX + 100 * scale, y: centerY - 50 * scale },
    // N - diagonal
    { x: centerX + 110 * scale, y: centerY - 35 * scale },
    { x: centerX + 120 * scale, y: centerY - 20 * scale },
    { x: centerX + 125 * scale, y: centerY - 5 * scale },
    { x: centerX + 130 * scale, y: centerY + 5 * scale },
    { x: centerX + 140 * scale, y: centerY + 20 * scale },
    // N - right vertical
    { x: centerX + 150 * scale, y: centerY + 35 * scale },
    { x: centerX + 150 * scale, y: centerY + 50 * scale },
    { x: centerX + 150 * scale, y: centerY + 20 * scale },
    { x: centerX + 150 * scale, y: centerY + 5 * scale },
    { x: centerX + 150 * scale, y: centerY - 10 * scale },
    { x: centerX + 150 * scale, y: centerY - 25 * scale },
    { x: centerX + 150 * scale, y: centerY - 40 * scale },
    { x: centerX + 150 * scale, y: centerY - 50 * scale },
    
    // I - vertical
    { x: centerX + 200 * scale, y: centerY - 50 * scale },
    { x: centerX + 200 * scale, y: centerY - 35 * scale },
    { x: centerX + 200 * scale, y: centerY - 20 * scale },
    { x: centerX + 200 * scale, y: centerY - 5 * scale },
    { x: centerX + 200 * scale, y: centerY + 10 * scale },
    { x: centerX + 200 * scale, y: centerY + 25 * scale },
    { x: centerX + 200 * scale, y: centerY + 40 * scale },
    { x: centerX + 200 * scale, y: centerY + 50 * scale },
  ];
  
  // Create dots
  constellationPoints.forEach((point, i) => {
    setTimeout(() => {
      const dot = document.createElement('div');
      dot.className = 'constellation-dot';
      dot.style.left = point.x + 'px';
      dot.style.top = point.y + 'px';
      document.body.appendChild(dot);
      
      setTimeout(() => {
        dot.style.opacity = 1;
      }, 50);
    }, i * 100);
  });
  
  // Create connecting lines with delay
  setTimeout(() => {
    drawConstellationLines(constellationPoints);
  }, constellationPoints.length * 100 + 500);
}

function drawConstellationLines(points) {
  // Connect the denser constellation points
  const connections = [
    // H - left vertical connections
    [0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,7],
    // H - horizontal connections
    [4,8], [8,9], [9,10], [10,11],
    // H - right vertical connections
    [12,13], [13,14], [14,15], [15,16], [16,17], [17,18], [18,19],
    [11,16], // Connect horizontal to right vertical
    
    // I - vertical connections
    [20,21], [21,22], [22,23], [23,24], [24,25], [25,26], [26,27],
    
    // M - left vertical connections
    [28,29], [29,30], [30,31], [31,32], [32,33], [33,34], [34,35],
    // M - left diagonal
    [35,36], [36,37], [37,38],
    // M - center
    [38,39],
    // M - right diagonal
    [39,40], [40,41], [41,42],
    // M - right vertical connections
    [42,43], [43,44], [44,45], [45,46], [46,47], [47,48], [48,49], [49,50],
    
    // A - left diagonal
    [51,52], [52,53], [53,54], [54,55], [55,56], [56,57], [57,58],
    // A - horizontal bar
    [59,60], [60,61], [61,62], [62,63],
    // A - right diagonal
    [58,64], [64,65], [65,66], [66,67], [67,68], [68,69], [69,70],
    [59,63], // Connect bar
    
    // N - left vertical
    [71,72], [72,73], [73,74], [74,75], [75,76], [76,77], [77,78],
    // N - diagonal
    [78,79], [79,80], [80,81], [81,82], [82,83],
    // N - right vertical
    [83,84], [84,85], [85,86], [86,87], [87,88], [88,89], [89,90], [90,91],
    
    // I - vertical connections
    [92,93], [93,94], [94,95], [95,96], [96,97], [97,98], [98,99]
  ];
  
  connections.forEach((connection, i) => {
    setTimeout(() => {
      const [start, end] = connection;
      if (!points[start] || !points[end]) return; // Safety check
      
      const p1 = points[start];
      const p2 = points[end];
      
      const line = document.createElement('div');
      line.className = 'constellation-line';
      
      const length = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      
      line.style.width = length + 'px';
      line.style.left = p1.x + 'px';
      line.style.top = p1.y + 'px';
      line.style.transform = `rotate(${angle}deg)`;
      
      document.body.appendChild(line);
      
      setTimeout(() => {
        line.style.opacity = 0.4;
      }, 50);
    }, i * 80); // Faster line drawing
  });
}

// Create heart galaxy morph
function morphToHeart() {
  galaxyActive = true;
  const centerX = galaxyCanvas.width / 2;
  const centerY = galaxyCanvas.height / 2;
  
  galaxyParticles = [];
  
  // Heart shape equation
  for (let i = 0; i < 800; i++) {
    const t = (i / 800) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    
    const particle = {
      x: centerX + x * 8,
      y: centerY + y * 8,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.01
    };
    
    galaxyParticles.push(particle);
  }
  
  // Animate heart particles
  function animateHeart() {
    if (!galaxyActive) return;
    
    galaxyCtx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
    
    galaxyParticles.forEach(particle => {
      particle.twinkle += particle.twinkleSpeed;
      const opacity = particle.opacity + Math.sin(particle.twinkle) * 0.2;
      
      galaxyCtx.fillStyle = `rgba(255, 100, 150, ${opacity})`;
      galaxyCtx.beginPath();
      galaxyCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      galaxyCtx.fill();
      
      galaxyCtx.shadowBlur = 10;
      galaxyCtx.shadowColor = "rgba(255, 150, 200, 0.5)";
      galaxyCtx.fill();
      galaxyCtx.shadowBlur = 0;
    });
    
    requestAnimationFrame(animateHeart);
  }
  
  animateHeart();
}

// Create kiss emoji shower
function createKissShower() {
  const kissEmojis = ['💋', '😘', '💕', '💖', '❤️', '💗'];
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Create 30 kisses over 5 seconds
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const kiss = document.createElement('div');
      kiss.className = 'kiss';
      kiss.textContent = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
      
      // Random position across width
      kiss.style.left = Math.random() * width + 'px';
      kiss.style.top = height + 'px';
      
      // Random animation delay for staggered effect
      kiss.style.animationDelay = (Math.random() * 0.5) + 's';
      
      document.body.appendChild(kiss);
      
      // Remove after animation
      setTimeout(() => {
        kiss.remove();
      }, 3500);
    }, i * 150); // Stagger creation
  }
}

// Scene timeline
function startExperience() {
  startPrompt.classList.add('hidden');
  
  // Start music
  music.volume = 0;
  music.play();
  
  // Fade in music
  let volume = 0;
  const fadeIn = setInterval(() => {
    volume += 0.01;
    if (volume >= 0.3) {
      clearInterval(fadeIn);
      volume = 0.3;
    }
    music.volume = volume;
  }, 50);
  
  // Scene 1: The Silence & Intro (0-15s)
  setTimeout(() => {
    showText("Before you… everything felt endless.<br><br>But not meaningful.", 8000);
  }, 3000);
  
  // Scene 2: Lonely Universe (15-30s)
  setTimeout(() => {
    showText("Billions of stars…<br><br>Billions of possibilities…", 8000);
  }, 15000);
  
  // Scene 3: Chosen Star (30-45s)
  setTimeout(() => {
    showText("And then… the universe whispered your name.", 10000);
    // Create a brighter center star effect
    const brightStar = new Star();
    brightStar.x = starsCanvas.width / 2;
    brightStar.y = starsCanvas.height / 2;
    brightStar.radius = 5;
    brightStar.z = 0;
    stars.push(brightStar);
  }, 30000);
  
  // Scene 4: Cosmic Bloom (45-60s)
  setTimeout(() => {
    createGalaxy();
  }, 45000);
  
  // Scene 5: Name Constellation Formation (60-85s)
  setTimeout(() => {
    galaxyActive = false;
    galaxyCtx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
    createConstellation();
  }, 60000);
  
  // Scene 6: Display Text Name AFTER constellation (85-100s)
  setTimeout(() => {
    nameEl.innerHTML = "HIMANI";
    nameEl.style.opacity = 1;
  }, 85000);
  
  // Scene 7: First Emotional Message (100-115s)
  setTimeout(() => {
    nameEl.style.opacity = 0; // Fade out name
    showText("Out of infinite worlds…<br><br>I would still find you.", 12000);
  }, 100000);
  
  // Scene 8: Heart Galaxy + Core Message (115-135s)
  setTimeout(() => {
    showText("You are my gravity.<br><br>My light.<br><br>My forever.", 15000);
    morphToHeart();
  }, 115000);
  
  // Scene 9: Final Message (135-155s)
  setTimeout(() => {
    showText("Stay… the universe feels right with you in it.", 18000);
  }, 135000);
  
  // Kiss shower finale (145-150s)
  setTimeout(() => {
    createKissShower();
  }, 145000);
  
  // Final fade out (160-165s)
  setTimeout(() => {
    document.body.style.transition = "opacity 4s ease";
    document.body.style.opacity = 0;
  }, 160000);
}

// Start on click/tap
startPrompt.addEventListener('click', startExperience);

// Begin animations
animate();
