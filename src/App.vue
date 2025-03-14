<template>
  <div class="app">
    <dynamic-background />
    <div class="content">
      <h2>Dom Crosbie</h2>
      <headshot class="headshot">
          <img src="./assets/Dom.jpeg" alt="Headshot">
      </headshot>      
      <div class="sections">
        <github-projects class="fixed-height-component" />
        <chat-introduction class="fixed-height-component" />
        <div class="button-container">
          <a href="mailto:domcrosbie22@gmail.com" target="_blank">
            <button class="contact-button email">Contact Me</button>
          </a>
          <a href="https://www.linkedin.com/in/dominick-crosbie-93990992/" target="_blank">
            <button class="contact-button linkedin">LinkedIn</button>
          </a>
        </div>
        <about-me />
      </div>
    </div>
  </div>
</template>

<script>
import DynamicBackground from './components/DynamicBackground.vue'
import ChatIntroduction from './components/ChatIntroduction.vue'
import AboutMe from './components/AboutMe.vue'
import GithubProjects from './components/GitHubProjects.vue'

export default {
  name: 'App',
  components: {
    DynamicBackground,
    AboutMe,
    GithubProjects,
    ChatIntroduction
  }
}
</script>

<style lang="scss">
:root {
  --primary-color: #2c3e50;
  --secondary-color: #42b983;
  --text-color: #ffffff;
  --background-color: #1a1a1a;
  --border-radius: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
  color: var(--text-color);
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  position: relative;
  min-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 1350px;
  margin: 0 auto;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  justify-self: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.sections {
  margin-top: 4rem;
  display: grid;
  gap: 2rem;
}

.fixed-height-component {
  height: 400px;
  overflow-y: auto;
  /* Add custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.contact-button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &.email {
    background: linear-gradient(45deg, rgba(142, 84, 233, 0.2), rgba(71, 118, 230, 0.2));
    &:hover {
      background: linear-gradient(45deg, rgba(142, 84, 233, 0.3), rgba(71, 118, 230, 0.3));
    }
  }

  &.linkedin {
    background: linear-gradient(45deg, rgba(71, 118, 230, 0.2), rgba(66, 185, 131, 0.2));
    &:hover {
      background: linear-gradient(45deg, rgba(71, 118, 230, 0.3), rgba(66, 185, 131, 0.3));
    }
  }
}

.headshot {
  display: grid;
  justify-self: center;
  width: 220px;
  height: 220px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  background: linear-gradient(to bottom, rgba(142, 84, 233, 0.2), rgba(71, 118, 230, 0.2));
  padding: 4px;
}

.headshot img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  object-position: center 0%;
  border-radius: 50%;
}

@media (min-width: 768px) {
  .sections {
    grid-template-columns: 1fr 1fr;
  }
  
  .button-container {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .fixed-height-component {
    height: 300px;
  }
  
  .contact-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>
