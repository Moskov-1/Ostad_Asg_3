# CI/CD Deployment: Challenges and Solutions

## Challenges Encountered:

1. **PM2 Process Not Persisting** - Deployment workflow completed but PM2 showed no running processes; app was inaccessible on port 3000. Solution: Created `ecosystem.config.js` for PM2 configuration and updated workflow to use `pm2 save --force`.

2. **Insufficient Error Handling** - No clear error messages when server failed to start. Solution: Added comprehensive error handling and logging to `server.js` with proper exit codes.

3. **Weak Deployment Verification** - Workflow reported success even when app wasn't running. Solution: Increased verification wait time to 10s and added PM2 status/logs checks.

4. **Missing Test Artifacts Warning** - Confusing warnings about missing test results. Solution: Added conditional logic to only download artifacts when triggered by workflow run.

## Final Result:

Successfully implemented automated CI/CD pipeline with GitHub Actions and self-hosted EC2 runner. However, the initial deployment required manual intervention - I had to SSH into the EC2 instance and manually run `pm2 start ecosystem.config.js` to get the application running for the first time. After this initial manual start and running `pm2 save`, subsequent deployments now work automatically. The pipeline now handles automated testing, deployment, and PM2 process management with auto-restart capabilities.

## Architecture

- **CI Platform**: GitHub Actions
- **Deployment Target**: AWS EC2 (self-hosted runner)
- **Process Manager**: PM2
- **Node.js Version**: 22.x
- **Server Framework**: Express.js

## Deployment Workflow

1. Push to `main` branch triggers GitHub Actions
2. Test workflow runs on GitHub's infrastructure
3. Deploy workflow runs on self-hosted EC2 runner
4. PM2 restarts application with latest code
5. Verification checks confirm successful deployment
