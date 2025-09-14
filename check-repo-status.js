#!/usr/bin/env node

import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function checkRepoStatus() {
  try {
    console.log('🔍 Checking repository status and deployment setup...');
    
    // Check if PR was merged
    const { data: pr } = await octokit.rest.pulls.get({
      owner: process.env.GITHUB_USERNAME,
      repo: 'romanian-dating-backend-api',
      pull_number: 1
    });
    
    console.log(`\n🔗 PR #1 Status:`);
    console.log(`   State: ${pr.state}`);
    console.log(`   Merged: ${pr.merged}`);
    console.log(`   Merged at: ${pr.merged_at}`);
    console.log(`   Merge commit SHA: ${pr.merge_commit_sha}`);
    
    // Get latest commits on main
    const { data: commits } = await octokit.rest.repos.listCommits({
      owner: process.env.GITHUB_USERNAME,
      repo: 'romanian-dating-backend-api',
      sha: 'main',
      per_page: 5
    });
    
    console.log(`\n📋 Latest commits on main branch:`);
    for (const commit of commits) {
      console.log(`   🔗 ${commit.sha.substring(0, 7)}: ${commit.commit.message}`);
      console.log(`      Author: ${commit.commit.author.name}`);
      console.log(`      Date: ${commit.commit.author.date}`);
    }
    
    // Check if there's a package.json (for Railway deployment)
    try {
      const { data: packageJson } = await octokit.rest.repos.getContent({
        owner: process.env.GITHUB_USERNAME,
        repo: 'romanian-dating-backend-api',
        path: 'package.json'
      });
      console.log(`\n📦 package.json exists - good for Railway deployment`);
    } catch (error) {
      console.log(`\n❌ No package.json found - needed for Railway deployment`);
    }
    
    // Check for Railway config
    try {
      const { data: railwayConfig } = await octokit.rest.repos.getContent({
        owner: process.env.GITHUB_USERNAME,
        repo: 'romanian-dating-backend-api',
        path: 'railway.json'
      });
      console.log(`\n🚂 railway.json exists - Railway deployment configured`);
    } catch (error) {
      console.log(`\n⚠️  No railway.json found - need to configure Railway deployment`);
    }
    
    // Check for Dockerfile
    try {
      const { data: dockerfile } = await octokit.rest.repos.getContent({
        owner: process.env.GITHUB_USERNAME,
        repo: 'romanian-dating-backend-api',
        path: 'Dockerfile'
      });
      console.log(`\n🐳 Dockerfile exists`);
    } catch (error) {
      console.log(`\n📝 No Dockerfile found`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkRepoStatus();
