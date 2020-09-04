#!/bin/bash

if [[ "$1" == "master" ]]; then
	echo
	echo Deploying Senti App $1 ...
	rsync -r --quiet $2/build/ deploy@rey.webhouse.net:/srv/www/waterworks
	echo
	# Senti Workspace
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti Waterworks App Master updated!"}' $3
	echo Deployment to production done!
	exit 0
fi

if [[ "$1" == "beta" ]]; then
	echo
	echo Deploying Senti App $1 ...
	rsync -r --quiet $2/build/ deploy@rey.webhouse.net:/srv/www/betawaterworks
	echo
	# Senti Workspace
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti Waterworks App Beta updated!"}' $3
	echo Deployment to production done!
	exit 0
fi

if [[ "$1" == "alpha" ]]; then
	echo
	echo Deploying Senti App $1 ...
	rsync -r --quiet $2/build/ deploy@rey.webhouse.net:/srv/www/alphawaterworks
	echo
	# Senti Workspace
	curl -X POST -H 'Content-type: application/json' --data '{"text":"Senti Waterworks App Alpha updated!"}' $3
	echo Deployment to production done!
	exit 0
fi