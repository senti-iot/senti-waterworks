#!/bin/bash

if [[ "$1" == "master" ]]; then
	echo
	echo Deploying Senti App $1 ...
	# rsync -r --quiet $2/build/ ubuntu@kanata.webhouse.net:/srv/www/odeumcode/dashboard.senti.cloud
	rsync -r --quiet $2/build/ deploy@rey.webhouse.net:/srv/www/waterworks
	echo
	# Senti Workspace
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti Waterworks App MASTER updated!"}' https://hooks.slack.com/services/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
	echo Deployment to production done!
	exit 0
fi

if [[ "$1" == "beta" ]]; then
	echo
	echo Deploying Senti App $1 ...
	# rsync -r --quiet $2/build/ ubuntu@kanata.webhouse.net:/srv/www/odeumcode/beta.senti.cloud
	rsync -r --quiet $2/build/ deploy@rey.webhouse.net:/srv/www/waterworks
	echo
	# Senti Workspace
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti Waterworks BETA updated!"}' https://hooks.slack.com/services/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
	echo Deployment to beta done!
	exit 0
fi