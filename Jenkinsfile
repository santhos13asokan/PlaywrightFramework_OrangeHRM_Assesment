pipeline {
    agent any

    tools {
        
        nodejs 'NodeJS-24'
    }

    parameters {
        choice(name: 'ENV', choices: ['dev', 'test'], description: 'Environment to test')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit', 'all'], description: 'Browser project to run')
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                dir('OrangeHrm') {
                    bat 'npm ci'
                }
            }
        }

        stage('Install Playwright browsers') {
            steps {
                dir('OrangeHrm') {
                    bat 'npx playwright install'
                }
            }
        }

        stage('Run Playwright tests') {
            steps {
                dir('NewProject') {
                    bat 'set "ENV=%ENV%" && set "BROWSER=%BROWSER%" && npm test'
                }
            }
        }
    }

    post {
        always {
            
            dir('OrangeHrm') {
                catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                    bat 'npm run allure:generate'
                }
            }

           
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'OrangeHrm/playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])

        
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'OrangeHrm/allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure Test Report'
            ])

            archiveArtifacts artifacts: 'OrangeHrm/test-results/**/*, OrangeHrm/allure-results/**/*, OrangeHrm/allure-report/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Playwright Test Suite passed!'
        }
        failure {
            echo 'Playwright Test Suite failed.'
        }
    }
}