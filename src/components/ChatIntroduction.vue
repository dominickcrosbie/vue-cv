<template>
  <div class="chat-introduction">
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="terminal-button red"></span>
          <span class="terminal-button yellow"></span>
          <span class="terminal-button green"></span>
        </div>
        <div class="terminal-title">terminal</div>
      </div>
      <div class="terminal-body">
        <div class="typing-animation">
          <span class="prompt">$ </span>
          <span class="command">name</span>
          <div class="response" v-html="typedTexts[0]"></div>
        </div>
        <div class="typing-animation delay-1">
          <span class="prompt">$ </span>
          <span class="command">title</span>
          <div class="response" v-html="typedTexts[1]"></div>
        </div>
        <div class="typing-animation delay-2">
          <span class="prompt">$ </span>
          <span class="command">description</span>
          <div class="response" v-html="typedTexts[2]"></div>
        </div>
        <div class="typing-animation delay-3">
          <span class="prompt">$ </span>
          <span class="command">current_work</span>
          <div class="response" v-html="typedTexts[3]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatIntroduction',
  data() {
    return {
      responses: [
        'Dom Crosbie',
        'Full Stack .Net Developer / AI Engineer',
        '5.5 years of experience in a Start-up environment, shipping results quickly and efficiently.',
        'Building an autonomous AI agent using Open AI and Semantic Hybrid search'
      ],
      typedTexts: ['', '', '', ''],
      typingSpeed: 30,
      initialDelay: 300,
      completedResponses: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.typeText(this.responses[0], 0);
    }, this.initialDelay);
  },
  methods: {
    typeText(text, index) {
      let currentChar = 0;
      const typeInterval = setInterval(() => {
        if (currentChar < text.length) {
          this.typedTexts[index] += text.charAt(currentChar);
          currentChar++;
        } else {
          clearInterval(typeInterval);
          this.completedResponses++;
          
          if (index < this.responses.length - 1) {
            setTimeout(() => {
              this.typeText(this.responses[index + 1], index + 1);
            }, 300);
          }
        }
      }, this.typingSpeed);
    }
  }
}
</script>

<style scoped lang="scss">
.terminal {
  background-color: #1E1E1E;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.terminal-header {
  background-color: #2A2A2A;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  
  &.red {
    background-color: #FF5F56;
  }
  
  &.yellow {
    background-color: #FFBD2E;
  }
  
  &.green {
    background-color: #27C93F;
  }
}

.terminal-title {
  margin-left: auto;
  margin-right: auto;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.terminal-body {
  padding: 1.5rem;
  font-family: "Menlo", "Monaco", "Consolas", monospace;
  line-height: 1.6;
}

.typing-animation {
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.delay-1 {
  animation-delay: 0.6s;
}

.delay-2 {
  animation-delay: 1.2s;
}

.delay-3 {
  animation-delay: 1.8s;
}

.prompt {
  color: #4776e6;
  margin-right: 0.5rem;
}

.command {
  color: #FFBD2E;
}

.response {
  color: white;
  margin-top: 0.2rem;
  margin-left: 1rem;
  min-height: 1.6em;
}

.cursor-line {
  display: flex;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
  animation-delay: 2.4s;
}

.cursor {
  width: 10px;
  height: 18px;
  background-color: white;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>