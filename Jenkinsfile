pipeline {
  environment {
    registry = "tstrain199/nginx-arcade"
    registryCredential = 'dockerhub_id'
    dockerImage = ''
  }
  agent any
    stages {
      stage('Javascript Linting') {
        steps {
          sh 'eslint js/*'
          sh 'echo `id -a`'
        }
      }
      stage('Docker image build') {
        steps {
          script {
            dockerImage = docker.build registry + ":$BUILD_NUMBER"
          }
        }
      }
      stage('Deploy our image') {
        steps{
          script {
            docker.withRegistry( '', registryCredential ) {
              dockerImage.push()
            }
          }
        }
      }
      stage('Set current kubectl context') {
        steps{
            script {
              sh 'kubectl config set-context `kubectl config current-context`'
            }
        }
      }
      stage('Deploy new container') {
        steps {
          sh 'kubectl set image deployment my-app nginx-arcade=tstrain199/nginx-arcade:$BUILD_NUMBER'
        }
      }
    }
}
