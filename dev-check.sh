#!/usr/bin/env bash
# V3 instrument dev check: (re)start next dev if needed, probe the routes.
source ~/.nvm/nvm.sh 2>/dev/null
cd ~/spectralflow-landing || exit 1

if ! curl -s -m 2 -o /dev/null http://localhost:3000; then
  export NEXT_PUBLIC_TWIN_API=http://127.0.0.1:8611
  nohup npm run dev > /tmp/nextdev.log 2>&1 &
  disown
  echo "dev server starting..."
  for i in $(seq 1 40); do
    curl -s -m 2 -o /dev/null http://localhost:3000 && break
    sleep 2
  done
fi

code=$(curl -s -o /tmp/page.html -w '%{http_code}' http://localhost:3000/instrument)
echo "instrument HTTP $code"
echo "chooser hits: $(grep -c 'Choose your mission' /tmp/page.html)"
curl -s 'http://localhost:3000/instrument?profile=space' -o /tmp/space.html
echo "mars hits: $(grep -c 'Mars scout' /tmp/space.html)"
echo "radiation hits: $(grep -c 'Radiation hit' /tmp/space.html)"
curl -s 'http://localhost:3000/instrument?profile=defence' -o /tmp/def.html
echo "defence hits: $(grep -c 'Contested airspace' /tmp/def.html)"
echo "--- dev log tail ---"
tail -4 /tmp/nextdev.log
