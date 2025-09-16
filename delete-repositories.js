#!/usr/bin/env node

/**
 * GitHub Repository Deletion Script
 * Delete specified repositories using GitHub API
 */

const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Repositories to delete
const REPOS_TO_DELETE = [
  'web-app-920965',
  'web-app-473387', 
  'web-app-344179',
  'web-app-241864',
  'web-app-863883',
  'web-app-900995',
  'web-app-265067'
];

async function deleteRepositories() {
  console.log('🗑️ Starting repository deletion process...\n');

  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN not found in .env file');
    console.log('📝 Please add your GitHub Personal Access Token to .env:');
    console.log('GITHUB_TOKEN=ghp_your_token_here\n');
    process.exit(1);
  }

  if (!process.env.GITHUB_USERNAME) {
    console.error('❌ GITHUB_USERNAME not found in .env file');
    console.log('📝 Please add your GitHub username to .env:');
    console.log('GITHUB_USERNAME=your_username\n');
    process.exit(1);
  }

  console.log(`👤 GitHub User: ${process.env.GITHUB_USERNAME}`);
  console.log(`📋 Repositories to delete: ${REPOS_TO_DELETE.length}\n`);

  const results = {
    deleted: [],
    notFound: [],
    errors: []
  };

  for (const repoName of REPOS_TO_DELETE) {
    try {
      console.log(`🔍 Checking repository: ${repoName}`);
      
      // First check if repository exists
      try {
        await octokit.rest.repos.get({
          owner: process.env.GITHUB_USERNAME,
          repo: repoName
        });
        console.log(`✅ Repository found: ${repoName}`);
      } catch (error) {
        if (error.status === 404) {
          console.log(`⚠️ Repository not found: ${repoName}`);
          results.notFound.push(repoName);
          continue;
        }
        throw error;
      }

      // Delete the repository
      console.log(`🗑️ Deleting repository: ${repoName}`);
      
      await octokit.rest.repos.delete({
        owner: process.env.GITHUB_USERNAME,
        repo: repoName
      });

      console.log(`✅ Successfully deleted: ${repoName}\n`);
      results.deleted.push(repoName);

    } catch (error) {
      console.error(`❌ Failed to delete ${repoName}: ${error.message}\n`);
      results.errors.push({
        repo: repoName,
        error: error.message
      });
    }
  }

  // Summary report
  console.log('\n📊 DELETION SUMMARY:');
  console.log('=' .repeat(50));
  
  if (results.deleted.length > 0) {
    console.log(`\n✅ Successfully deleted (${results.deleted.length}):`);
    results.deleted.forEach(repo => console.log(`   - ${repo}`));
  }

  if (results.notFound.length > 0) {
    console.log(`\n⚠️ Not found (${results.notFound.length}):`);
    results.notFound.forEach(repo => console.log(`   - ${repo}`));
  }

  if (results.errors.length > 0) {
    console.log(`\n❌ Errors (${results.errors.length}):`);
    results.errors.forEach(item => console.log(`   - ${item.repo}: ${item.error}`));
  }

  console.log('\n🎉 Repository deletion process completed!');
  
  // Check if any repositories were actually deleted
  if (results.deleted.length === 0) {
    console.log('ℹ️ No repositories were deleted.');
  } else {
    console.log(`🗑️ Total repositories deleted: ${results.deleted.length}`);
  }
}

// Confirmation prompt before deletion
async function confirmDeletion() {
  console.log('⚠️ WARNING: This will permanently delete the following repositories:');
  REPOS_TO_DELETE.forEach(repo => console.log(`   - ${repo}`));
  console.log('\n🚨 This action CANNOT be undone!');
  
  // In a real scenario, you'd want user confirmation
  // For automation, we'll proceed directly
  console.log('\n✅ Proceeding with deletion...\n');
  
  await deleteRepositories();
}

confirmDeletion().catch(error => {
  console.error('💥 Fatal error:', error.message);
  process.exit(1);
});
