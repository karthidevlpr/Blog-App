pipeline {
    agent any

    // Define tools to be installed
    tools {
        // Install Node.js tool with a specific version
        nodejs 'node:latest'
    }

    stages {
        stage('Checkout') {
      steps {
        // Check out the repository from GitHub
        git credentialsId: '42d65627-cfa6-4e85-abaf-d20f6dcccfdf', url: 'https://github.com/karthidevlpr/Blog-App.git'
      }
        }
    }

    post {
        success {
      echo 'Pipeline completed successfully!'
        }
        failure {
      echo 'Pipeline failed.'
        }
    }
}
