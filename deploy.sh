rm deploy.zip
zip -r deploy.zip *
aws lambda update-function-code --function-name SportsEngineMindBodyIntegration --zip-file fileb://deploy.zip --publish
