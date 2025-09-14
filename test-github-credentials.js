#!/usr/bin/env node

import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

async function testGitHubCredentials() {
  console.log("🔍 Testing GitHub credentials...\n");

  if (!process.env.GITHUB_TOKEN) {
    console.error("❌ GITHUB_TOKEN not found in .env file");
    console.log("📝 Please add your GitHub Personal Access Token to .env:");
    console.log("GITHUB_TOKEN=ghp_your_token_here\n");
    process.exit(1);
  }

  if (!process.env.GITHUB_USERNAME) {
    console.error("❌ GITHUB_USERNAME not found in .env file");
    console.log("📝 Please add your GitHub username to .env:");
    console.log("GITHUB_USERNAME=your_username\n");
    process.exit(1);
  }

  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // Test authentication
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log("✅ GitHub authentication successful!");
    console.log(`👤 Logged in as: ${user.login}`);
    console.log(`📧 Email: ${user.email || 'Not public'}`);
    console.log(`🔗 Profile: ${user.html_url}`);

    // Test repository creation permissions
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 5
    });
    
    console.log(`\n📁 Recent repositories (${repos.length} found):`);
    repos.forEach(repo => {
      console.log(`  - ${repo.name} (${repo.private ? 'private' : 'public'})`);
    });

    // Test token scopes
    const response = await octokit.request('GET /user');
    const scopes = response.headers['x-oauth-scopes'];
    console.log(`\n🔑 Token scopes: ${scopes || 'Unable to detect'}`);

    console.log("\n🎉 All GitHub credentials are working correctly!");
    console.log("🚀 Ready to create repositories with DevOps Agent!");

  } catch (error) {
    console.error("\n❌ GitHub credentials test failed:");
    console.error(`Error: ${error.message}`);
    
    if (error.status === 401) {
      console.log("\n🔧 Troubleshooting:");
      console.log("1. Check if your GitHub Personal Access Token is correct");
      console.log("2. Ensure token has 'repo' scope enabled");
      console.log("3. Verify token hasn't expired");
      console.log("4. Generate a new token if needed: https://github.com/settings/tokens");
    }
    
    process.exit(1);
  }
}

testGitHubCredentials();
