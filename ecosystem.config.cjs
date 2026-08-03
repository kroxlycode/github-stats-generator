module.exports = {
  apps: [
    {
      name: 'github-stats-api',
      script: 'npm',
      args: 'run start',
      cwd: '/www/wwwroot/github-stats.kroxly.dev',
      env: {
        PORT: '3001'
      },
      autorestart: true,
      watch: false,
      out_file: '/root/.pm2/logs/github-stats-api-out.log',
      error_file: '/root/.pm2/logs/github-stats-api-error.log'
    },
    {
      name: 'github-stats-front',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 4173',
      cwd: '/www/wwwroot/github-stats.kroxly.dev',
      autorestart: true,
      watch: false,
      out_file: '/root/.pm2/logs/github-stats-front-out.log',
      error_file: '/root/.pm2/logs/github-stats-front-error.log'
    }
  ]
};
