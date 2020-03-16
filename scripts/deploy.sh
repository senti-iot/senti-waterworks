#!/bin/bash

if [[ "$1" == "master" ]]; then
	echo
	echo Deploying Senti App $1 ...
	rsync -r --quiet $2/build/ deploy@rey.webhouse.net:/srv/www/betawaterworks
	echo
	# Senti Workspace
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti Waterworks App Beta-Onboarding updated!"}' https://hooks.slack.com/services/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
	echo Deployment to production done!
	exit 0
fi