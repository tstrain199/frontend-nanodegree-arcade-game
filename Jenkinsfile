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
        }
      }
      stage('Docker image build') {
        steps {
          script {
            docker.withRegistry( '', registryCredential ) {
              dockerImage.push()
            }
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
      stage('set current kubectl context') {
        steps{
          sh 'kubectl config set-context `kubectl config current-context`'
        }
      }
      stage('Deploy container') {
        steps {
          sh 'kubectl run --generator=run-pod/v1 my-app --image=tstrain199/nginx-arcade --port=80'
          sh 'kubectl expose deployment my-app --type=LoadBalancer --port=9090 --target-port=80'
        }
      }
    }
}
