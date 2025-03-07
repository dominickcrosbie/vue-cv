<template>
    <nav class="nav-bar">
      <div class="logo">K.</div>
      <div class="nav-links">
        <a href="#about" class="nav-link">About</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style scoped lang="scss">
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
    margin-bottom: 2rem;
  }
  
  .logo {
    font-size: 2rem;
    font-weight: 700;
    @extend .gradient-text;
  }
  
  .nav-links {
    display: flex;
    gap: 2rem;
  }
  
  .nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    position: relative;
    transition: var(--transition);
    
    &:hover {
      color: var(--secondary-color);
      
      &:after {
        width: 100%;
      }
    }
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
      transition: var(--transition);
    }
  }
  </style>