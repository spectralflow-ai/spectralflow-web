#!/usr/bin/env bash
source ~/.nvm/nvm.sh 2>/dev/null
cd ~/spectralflow-landing || exit 1
npm run build 2>&1 | tail -25
