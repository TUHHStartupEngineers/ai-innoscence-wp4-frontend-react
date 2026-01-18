# Deployment Guide

This guide explains how to deploy the **CE Ecosystem Viewer** to the GitHub repository:
`https://github.com/TUHHStartupEngineers/ai-innoscence-wp4-frontend-react`

## Prerequisites

- Node.js (v20 recommended)
- Git

## 1. Project Configuration

The project is configured to use **GitHub Actions** for deployment to GitHub Pages.

### `vite.config.ts`
The `base` URL has been set to `/ai-innoscence-wp4-frontend-react/` to ensure assets load correctly on GitHub Pages.

### GitHub Actions
A workflow file exists at `.github/workflows/deploy.yml`. This workflow automatically builds and deploys the application whenever a push is made to the `main` branch.

## 2. Pushing to GitHub

To deploy the application, you simply need to push your code to the `main` branch of the repository.

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    ```

2.  **Add the Remote Repository**:
    ```bash
    git remote add origin https://github.com/TUHHStartupEngineers/ai-innoscence-wp4-frontend-react
    ```

3.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "feat: initial commit"
    git branch -M main
    git push -u origin main
    ```

## 3. GitHub Pages Setup

After pushing the code:

1.  Go to the repository on GitHub.
2.  Navigate to **Settings** > **Pages**.
3.  Under **Build and deployment**, ensure **Source** is set to **GitHub Actions**.
4.  The deployment workflow will run automatically. You can check its progress in the **Actions** tab.

Once completed, your site will be live at:
`https://TUHHStartupEngineers.github.io/ai-innoscence-wp4-frontend-react/`
