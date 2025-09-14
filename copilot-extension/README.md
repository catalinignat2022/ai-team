# Romanian Dating DevOps Copilot Extension

A GitHub Copilot Extension that integrates Claude Sonnet 4 AI with specialized DevOps expertise for Romanian dating app development.

## Features

- 🤖 **Claude Sonnet 4 Integration**: Latest AI model for advanced DevOps consultation
- 🚀 **GitHub Copilot Chat**: Seamless integration with Copilot Chat interface  
- 🏗️ **Infrastructure Automation**: Generate Terraform, Kubernetes, and CI/CD configs
- � **Dating App Specialized**: Optimized for Romanian dating platforms with 100K+ users
- 🔒 **GDPR Compliant**: Built-in EU data protection and privacy controls
- 📊 **Monitoring Setup**: Prometheus, Grafana, and alerting configurations
- 🌍 **Multi-Region**: EU-West-1 deployment with location services

## Usage in Copilot Chat

```
@romanian-dating-devops help me setup CI/CD for React Native app

@romanian-dating-devops create Terraform config for 100K users

@romanian-dating-devops what's the best monitoring stack for dating app?

@romanian-dating-devops optimize costs for our staging environment
```

## Installation

1. Install the extension from GitHub Marketplace
2. Configure your environment variables
3. Start using in Copilot Chat with `@romanian-dating-devops`

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Debug locally with GitHub CLI
npm run debug

# Run tests
npm test
```

## Configuration

Required environment variables:

```env
ANTHROPIC_API_KEY=your_claude_sonnet_4_key
GITHUB_TOKEN=your_github_token
APP_ID=your_github_app_id
PRIVATE_KEY=your_github_app_private_key
WEBHOOK_SECRET=your_webhook_secret
```

## Architecture

- **Express Server** - Handles GitHub App webhooks
- **Claude Sonnet 4** - AI-powered DevOps expertise
- **GitHub API** - Repository and organization management
- **Copilot Chat Integration** - Seamless user experience

## Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Submit pull request

## License

MIT License - see LICENSE file for details.
