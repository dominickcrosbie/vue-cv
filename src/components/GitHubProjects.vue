<template>
  <section class="github-projects">
    <h2>GitHub Activity</h2>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="commitData.length" class="contribution-graph">
      <div class="calendar-wrapper">
        <div class="months-container">
          <div v-for="(month, index) in monthLabels" 
               :key="index" 
               class="month-label"
               :style="{ width: `${monthWidths[index]}px` }">
            {{ month }}
          </div>
        </div>
        <div class="calendar">
          <div v-for="week in contributionWeeks" :key="week.week" class="week">
            <div 
              v-for="day in week.days" 
              :key="day.date"
              class="day"
              :class="[getContributionClass(day.count), { 'future-day': day.isFuture }]"
              :title="`${day.date}: ${day.count} commits`"
            ></div>
          </div>
        </div>
      </div>
      <div class="legend">
        <span>Less</span>
        <div class="legend-squares">
          <div class="day contribution-0"></div>
          <div class="day contribution-1"></div>
          <div class="day contribution-2"></div>
          <div class="day contribution-3"></div>
          <div class="day contribution-4"></div>
        </div>
        <span>More</span>
      </div>
    </div>
    <div v-else class="loading">
      Loading commit data...
    </div>
  </section>
</template>

<script>
export default {
  name: 'GithubProjects',
  data() {
    return {
      commitData: [],
      error: null,
      loading: false,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  computed: {
  monthLabels() {
    const labels = []
    const currentDate = new Date()
    // Set to 6 months ago
    const startDate = new Date(currentDate)
    startDate.setMonth(currentDate.getMonth() - 5) // Go back 5 months for 6 total months
    
    let currentMonth = startDate.getMonth()
    let currentYear = startDate.getFullYear()

    // Generate 6 months of labels
    for (let i = 0; i < 6; i++) {
      if (currentMonth > 11) {
        currentMonth = 0
        currentYear++
      }
      labels.push(`${this.months[currentMonth]} ${currentYear}`)
      currentMonth++
    }
    return labels
  },
  
  monthWidths() {
    const widths = []
    const currentDate = new Date()
    const startDate = new Date(currentDate)
    startDate.setMonth(currentDate.getMonth() - 5) // Go back 5 months for 6 total months
    
    let currentMonth = startDate.getMonth()
    let currentYear = startDate.getFullYear()

    for (let i = 0; i < 6; i++) {
      if (currentMonth > 11) {
        currentMonth = 0
        currentYear++
      }
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
      // Increased width calculation to account for new day size
      widths.push((daysInMonth / 7) * 14) // 12px square + 2px gap
      currentMonth++
    }
    return widths
  },
  
  contributionWeeks() {
    const weeks = []
    const currentDate = new Date()
    // Set to 6 months ago
    const startDate = new Date(currentDate)
    startDate.setMonth(currentDate.getMonth() - 5) // Go back 5 months for 6 total months
    
    // Needed for proper date calculation
    startDate.setDate(1) // Start from the 1st of the month for cleaner display
    
    // Calculate the first day to be a Sunday (start of week)
    const dayOfWeek = startDate.getDay()
    if (dayOfWeek !== 0) { // If not Sunday
      startDate.setDate(startDate.getDate() - dayOfWeek) // Go back to previous Sunday
    }
    
    const msPerDay = 24 * 60 * 60 * 1000
    
    // Combine commit data from all repos
    const allCommits = this.commitData.reduce((acc, repo) => {
      if (repo.commitData && Array.isArray(repo.commitData)) {
        repo.commitData.forEach(weekData => {
          const existingWeek = acc.find(w => w.week === weekData.week)
          if (existingWeek) {
            existingWeek.total += weekData.total
            weekData.days.forEach((count, index) => {
              existingWeek.days[index] += count
            })
          } else {
            acc.push({
              week: weekData.week,
              total: weekData.total,
              days: [...weekData.days]
            })
          }
        })
      }
      return acc
    }, [])

    // Calculate number of weeks needed to cover 6 months (roughly 26 weeks)
    const weeksNeeded = Math.ceil((currentDate - startDate) / (7 * msPerDay)) + 1
    
    // Create necessary number of weeks
    for (let weekIndex = 0; weekIndex < weeksNeeded; weekIndex++) {
      const week = {
        week: weekIndex,
        days: []
      }
      
      // Create 7 days per week
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const date = new Date(startDate.getTime() + ((weekIndex * 7 + dayIndex) * msPerDay))
        const isFuture = date > currentDate
        
        // Find commits for this day
        const weekData = allCommits.find(d => {
          const commitDate = new Date(d.week * 1000)
          return commitDate.getTime() <= date.getTime() && 
                 date.getTime() < (commitDate.getTime() + 7 * msPerDay)
        })
        
        const dayCount = weekData ? weekData.days[dayIndex] : 0
        
        week.days.push({
          date: date.toLocaleDateString(),
          count: isFuture ? 0 : (dayCount || 0),
          isFuture
        })
      }
      
      weeks.push(week)
    }
    
    return weeks
  }
},
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        
        // Use the Netlify URL since that's where the function is hosted
        const response = await fetch(`${process.env.VUE_APP_API_URL}/.netlify/functions/getGithubStats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        
        this.commitData = data;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = `Failed to load GitHub data: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    getContributionClass(count) {
      if (count === 0) return 'contribution-0'
      if (count <= 3) return 'contribution-1'
      if (count <= 6) return 'contribution-2'
      if (count <= 9) return 'contribution-3'
      return 'contribution-4'
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.github-projects {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;
}

.contribution-graph {
  padding: 1rem 0;
  width: 100%;
  min-width: 800px; /* Ensure minimum width for readability */
  overflow-x: auto; /* Allow horizontal scroll if needed */
}

.calendar-wrapper {
  position: relative;
  margin: 1.5rem 0;
  width: 100%;
  overflow: hidden;
}

.months-container {
  display: flex;
  margin-bottom: 0.5rem;
  width: 100%;
}

.month-label {
  color: var(--text-color);
  font-size: 0.875rem;
  text-align: start;
  flex-shrink: 0;
  padding-left: 4px;
  min-width: calc(100% / 6); /* Ensure equal width for each month */
}

.calendar {
  display: flex;
  gap: 2px;
  width: 100%;
  justify-content: space-between; /* Distribute space evenly */
}

.week {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 2px;
  flex: 1; /* Allow weeks to grow */
  min-width: 14px; /* Minimum width for each week */
}

.day {
  width: 14px; /* Increased from 12px */
  height: 14px; /* Increased from 12px */
  border-radius: 2px;
  transition: transform 0.2s;
  flex-shrink: 0;
}

.day:hover {
  transform: scale(1.2);
  z-index: 1;
}

.future-day {
  opacity: 0.5;
}

.contribution-0 {
  background-color: rgba(66, 184, 131, 0.05);
}

.contribution-1 {
  background-color: rgba(66, 184, 131, 0.2);
}

.contribution-2 {
  background-color: rgba(66, 184, 131, 0.4);
}

.contribution-3 {
  background-color: rgba(66, 184, 131, 0.6);
}

.contribution-4 {
  background-color: rgba(66, 184, 131, 0.8);
}

.legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
  color: var(--text-color);
  font-size: 0.875rem;
}

.legend-squares {
  display: flex;
  gap: 2px;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #ff6b6b;
}

.loading {
  color: var(--text-color);
}

@media (max-width: 1200px) {
  .contribution-graph {
    min-width: 600px;
  }
  
  .day {
    width: 12px;
    height: 12px;
  }
  
  .month-label {
    font-size: 0.75rem;
  }
}

@media (max-width: 768px) {
  .contribution-graph {
    min-width: 500px;
  }
  
  .day {
    width: 10px;
    height: 10px;
  }
}
</style>