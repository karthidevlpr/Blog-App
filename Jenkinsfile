pipeline {
    agent any

    // Define tools to be installed
    tools {
        // Install Node.js tool with a specific version
        nodejs 'NodeJS'
    }

    stages {
        stage('echo') {
      steps {
        // Check out the repository from GitHub
        sh 'echo "karthi"'
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
