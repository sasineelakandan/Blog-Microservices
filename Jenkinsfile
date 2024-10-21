pipeline{
    agent any
    
    stages{
        stage('checkout'){
            steps{
                checkout scm
            }
        }
        stage('Build and push'){
            steps{
                script{
                    dockerBuildAndPush('api_gateway')
                    dockerBuildAndPush('auth')
                    dockerBuildAndPush('posts')
                    dockerBuildAndPush('comments')
                }
            }
        }
    }
}

def dockerBuildAndPush(servicename){
    dir(servicename){
        sh "docker build -t hunais/${servicename}:latest ."      
        withCredentials([usernamePassword(credentialsId:'hunaisdocker',usernameVariable:'DOCKER_USERNAME',passwordVariable:'DOCKER_PASSWORD')]){
            sh "docker push hunais/${servicename}:latest"
        }
    }
}
