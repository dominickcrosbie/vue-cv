<template>
  <div class="background-container">
    <div class="particles">
      <div class="particle-row" v-for="row in 3" :key="row">
        <div class="particle" v-for="col in 6" :key="col"></div>
      </div>
    </div>
    <div class="gradient-circle gradient-circle-1"></div>
    <div class="gradient-circle gradient-circle-2"></div>
    <div class="gradient-circle gradient-circle-3"></div>
    <div class="noise-overlay"></div>
    <div class="gradient-overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'DynamicBackground'
}
</script>

<style scoped lang="scss">
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #0c0c0c;
  overflow: hidden;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(142, 84, 233, 0.15) 0%,
    rgba(71, 118, 230, 0.15) 100%
  );
  animation: pulse 8s ease-in-out infinite;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 1000px;
  z-index: 1;
}

.particle-row {
  position: absolute;
  width: 100%;
  height: 33.33%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  animation: rowFloat 20s infinite linear;
}

.particle-row:nth-child(2) {
  top: 33.33%;
  animation-delay: -6s;
  animation-duration: 25s;
}

.particle-row:nth-child(3) {
  top: 66.66%;
  animation-delay: -12s;
  animation-duration: 22s;
}

.particle {
  width: 8px;
  height: 8px;
  background: rgba(142, 84, 233, 0.6);
  border-radius: 50%;
  animation: particleFloat 15s infinite ease-in-out;
}

.particle:nth-child(even) {
  background: rgba(71, 118, 230, 0.6);
  animation-duration: 18s;
  animation-delay: -7s;
}

.particle:nth-child(3n) {
  animation-duration: 20s;
  animation-delay: -5s;
}

.particle:nth-child(3n+1) {
  animation-duration: 22s;
  animation-delay: -3s;
}

.gradient-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  pointer-events: none;
}

.gradient-circle-1 {
  top: -200px;
  right: -100px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #8e54e9, transparent 70%);
  animation: float 20s infinite alternate ease-in-out;
}

.gradient-circle-2 {
  bottom: -300px;
  left: -200px;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, #4776e6, transparent 70%);
  animation: float 15s infinite alternate-reverse ease-in-out;
}

.gradient-circle-3 {
  top: 30%;
  left: 50%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #e94747, transparent 70%);
  animation: float 25s infinite alternate ease-in-out;
}

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.15;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

@keyframes rowFloat {
  0% {
    transform: translateZ(0) translateX(-5%);
  }
  50% {
    transform: translateZ(100px) translateX(5%);
  }
  100% {
    transform: translateZ(0) translateX(-5%);
  }
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-20px) scale(1.2);
  }
  50% {
    transform: translateY(0) scale(1);
  }
  75% {
    transform: translateY(20px) scale(1.2);
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 20px);
  }
}

/* Add responsive design */
@media (max-width: 768px) {
  .particle {
    width: 6px;
    height: 6px;
  }
  
  .gradient-circle {
    opacity: 0.1;
  }
}
</style>