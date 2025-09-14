/**
 * GitHub App Authentication Middleware
 */

import crypto from 'crypto';
import { createAppAuth } from '@octokit/auth-app';

export function authenticateApp(req, res, next) {
  try {
    const signature = req.get('X-Hub-Signature-256');
    const payload = JSON.stringify(req.body);
    
    if (!signature) {
      return res.status(401).json({ error: 'Missing signature' });
    }

    // Verify webhook signature
    const expectedSignature = `sha256=${crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(payload, 'utf8')
      .digest('hex')}`;

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Add GitHub App authentication
    req.auth = createAppAuth({
      appId: process.env.APP_ID,
      privateKey: process.env.PRIVATE_KEY,
    });

    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
}
