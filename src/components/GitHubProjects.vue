<template>
    <section class="github-projects">
      <h2>GitHub Projects</h2>
      <div class="projects-grid">
        <!-- This will be populated with data from the API later -->
        <p>Loading projects...</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'GithubProjects'
  }
  </script>
  
  <style scoped>
  .github-projects {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 2rem;
    backdrop-filter: blur(10px);
  }
  
  h2 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
  }
  
  .projects-grid {
    display: grid;
    gap: 1rem;
  }
  </style>