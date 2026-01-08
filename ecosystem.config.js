module.exports = {
    apps: [{
        name: 'node-app',
        script: 'src/server.js',
        cwd: './',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        error_file: './logs/pm2-error.log',
        out_file: './logs/pm2-out.log',
        log_file: './logs/pm2-combined.log',
        time: true,
        merge_logs: true,
        // Ensure process starts and stays running
        min_uptime: '10s',
        max_restarts: 10,
        restart_delay: 4000,
        // Graceful shutdown
        kill_timeout: 5000,
        wait_ready: false,
        listen_timeout: 10000
    }]
};
