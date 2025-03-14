const fetch = require('cross-fetch')

exports.handler = async function(event, context) {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://domcrosbie.com",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400"
      }
    };
  }

  const GITHUB_TOKENS = process.env.GITHUB_TOKEN.split(',').map(token => token.trim());
  const GITHUB_USERNAMES = process.env.GITHUB_USERNAME.split(',').map(name => name.trim());
  
  if (!GITHUB_TOKENS.length || !GITHUB_USERNAMES.length) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "https://domcrosbie.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: 'Required environment variables are not set' })
    };
  }

  try {
    const repoStats = [];
    
    for (let i = 0; i < GITHUB_USERNAMES.length; i++) {
      const username = GITHUB_USERNAMES[i];
      const token = GITHUB_TOKENS[i];
      
      try {
        const reposResponse = await fetch(
          `https://api.github.com/user/repos?per_page=100&visibility=all`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github+json'
            }
          }
        );
        
        if (!reposResponse.ok) {
          console.error(`Error fetching repos for ${username}: ${reposResponse.status}`);
          continue;
        }
        
        const repos = await reposResponse.json();
        
        for (const repo of repos) {
          try {
            const response = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/stats/commit_activity`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept': 'application/vnd.github+json'
                }
              }
            );
            
            if (!response.ok) {
              console.error(`Error fetching data for ${repo.name}: ${response.status}`);
              continue;
            }
            
            const data = await response.json();
            if (Array.isArray(data)) {
              repoStats.push({
                repo: repo.name,
                owner: username,
                commitData: data
              });
            }
          } catch (repoError) {
            console.error(`Error processing repo ${repo.name}:`, repoError);
          }
        }
      } catch (userError) {
        console.error(`Error processing user ${username}:`, userError);
      }
    }
    
    if (repoStats.length === 0) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "https://domcrosbie.com",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: 'No commit data found for any repositories' })
      };
    }
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://domcrosbie.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(repoStats)
    };
    
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "https://domcrosbie.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: 'Failed to fetch commit data' })
    };
  }
};
