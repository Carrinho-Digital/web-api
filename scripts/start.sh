#/bin/bash

cd ~/app/web-api/ 
npm install --production
node -r dotenv/config index.js
EOF