#!/bin/bash
cd /home/kavia/workspace/code-generation/ai-copilot-chat-5302-5312/ai_copilot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

