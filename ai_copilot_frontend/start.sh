#!/bin/bash

# AI Copilot Frontend Startup Script
# This script verifies configuration before starting the React app

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting AI Copilot Frontend...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Warning: .env file not found!${NC}"
    echo -e "${YELLOW}Creating .env from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please edit .env and set REACT_APP_BACKEND_URL if needed${NC}"
fi

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Check if REACT_APP_BACKEND_URL is set
if [ -z "$REACT_APP_BACKEND_URL" ]; then
    echo -e "${YELLOW}⚠️  REACT_APP_BACKEND_URL not set, using default: http://localhost:3001${NC}"
    export REACT_APP_BACKEND_URL="http://localhost:3001"
fi

echo -e "${GREEN}✅ Configuration loaded${NC}"
echo -e "   Backend URL: ${REACT_APP_BACKEND_URL}${NC}"

# Start the development server
echo -e "${GREEN}🌐 Starting React development server...${NC}"
npm start
