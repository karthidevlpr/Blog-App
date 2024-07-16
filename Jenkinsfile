pipeline {
    agent any

    // Define tools to be installed
    tools {
        // Install Node.js tool with a specific version
        nodejs 'NodeJS'
    }

    stages {
        stage('npm install') {
      steps {
        // Change to the client directory and install dependencies
        dir('server') {
          sh 'npm install'
        }
      }
        }

        stage('run server') {
      steps {
        // Change to the client directory and install dependencies
        dir('server') {
          sh 'node server.js'
        }
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
