#!/bin/bash

# Ignore history from export Doppler token
export HISTIGNORE="export DOPPLER_TOKEN"

# Export Doppler token
export DOPPLER_TOKEN=$1

# Run Doppler provided by our service token with docker compose command
doppler run -- docker compose --env-file <(doppler secrets download --no-file --format docker) up -d