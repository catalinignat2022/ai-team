#!/usr/bin/env node

import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function checkPRStatus() {
  try {
    console.log('🔍 Checking PR status for romanian-dating-backend-api...');
    
    // Get all PRs
    const { data: prs } = await octokit.rest.pulls.list({
      owner: process.env.GITHUB_USERNAME,
      repo: 'romanian-dating-backend-api',
      state: 'all'
    });
    
    console.log(`\n📋 Found ${prs.length} PRs:`);
    
    for (const pr of prs) {
      console.log(`\n🔗 PR #${pr.number}: ${pr.title}`);
      console.log(`   State: ${pr.state}`);
      console.log(`   Mergeable: ${pr.mergeable}`);
      console.log(`   Mergeable State: ${pr.mergeable_state}`);
      console.log(`   Draft: ${pr.draft}`);
      console.log(`   Head: ${pr.head.ref}`);
      console.log(`   Base: ${pr.base.ref}`);
      console.log(`   URL: ${pr.html_url}`);
      
      if (pr.state === 'open') {
        // Check if there are conflicts
        const { data: prDetails } = await octokit.rest.pulls.get({
          owner: process.env.GITHUB_USERNAME,
          repo: 'romanian-dating-backend-api',
          pull_number: pr.number
        });
        
        console.log(`   ✅ Detailed mergeable: ${prDetails.mergeable}`);
        console.log(`   📊 Mergeable state: ${prDetails.mergeable_state}`);
        console.log(`   🔄 Rebaseable: ${prDetails.rebaseable}`);
        
        if (prDetails.mergeable_state === 'dirty') {
          console.log(`   ❌ PR has merge conflicts!`);
        } else if (prDetails.mergeable_state === 'blocked') {
          console.log(`   🚫 PR is blocked by required status checks`);
        } else if (prDetails.mergeable_state === 'behind') {
          console.log(`   ⬇️ PR is behind the base branch`);
        }
      }
    }
    
    // Check repository default branch
    const { data: repo } = await octokit.rest.repos.get({
      owner: process.env.GITHUB_USERNAME,
      repo: 'romanian-dating-backend-api'
    });
    
    console.log(`\n📦 Repository info:`);
    console.log(`   Default branch: ${repo.default_branch}`);
    console.log(`   Private: ${repo.private}`);
    
  } catch (error) {
    console.error('❌ Error checking PR status:', error.message);
    if (error.status === 404) {
      console.log('Repository might not exist or no access');
    }
  }
}

checkPRStatus();
