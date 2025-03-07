<template>
  <div class="app">
    <dynamic-background />
    <div class="content">
      <h2>Dom Crosbie</h2>
      <headshot class="headshot">
          <img src="./assets/Dom.jpeg" alt="Headshot">
        </headshot>      
      <div class="sections">

        <github-projects />
        <chat-introduction />
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
}

.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 1200px;
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

.headshot {
  display: grid;
  justify-self: center;
  width: 220px;
  height: 220px;
  position: relative;
  overflow: hidden;
  border-radius: 50%; /* Perfectly rounded */
  background: linear-gradient(to bottom, rgba(142, 84, 233, 0.2), rgba(71, 118, 230, 0.2));
  padding: 4px; /* Creates a border effect */
}

.headshot img {
  width: 100%;
  height: 220px;
  object-fit: cover; /* This maintains aspect ratio while filling the container */
  object-position: center 0%; /* This focuses on the top half (adjust percentage as needed) */
  border-radius: 50%;
}

@media (min-width: 768px) {
  .sections {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
