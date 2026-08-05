module.exports = {
  apps: [
    {
      name: 'github-stats-api',
      script: 'npx',
      args: 'tsx server.ts',
      cwd: '/www/wwwroot/github-stats.kroxly.dev',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
    },
  ],
};
