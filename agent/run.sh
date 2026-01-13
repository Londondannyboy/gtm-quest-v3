#!/bin/bash

# Run the GTM Agent server

cd "$(dirname "$0")"

# Create venv if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate venv
source .venv/bin/activate

# Install dependencies
pip install -q -r requirements.txt

# Run the server
echo "Starting GTM Agent on http://localhost:8000"
python server.py
