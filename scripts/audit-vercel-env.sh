#!/bin/bash
# Audit Vercel environment variables for trailing spaces and slashes
# Usage: ./scripts/audit-vercel-env.sh [--fix]

set -e

FIX_MODE=false
if [[ "$1" == "--fix" ]]; then
  FIX_MODE=true
  echo "Running in FIX mode - will correct issues found"
else
  echo "Running in AUDIT mode - use --fix to correct issues"
fi

echo ""
echo "Pulling environment variables from Vercel..."

# Create temp file for env vars
TEMP_ENV=$(mktemp)
trap "rm -f $TEMP_ENV" EXIT

# Pull env vars to temp file
vercel env pull "$TEMP_ENV" --yes > /dev/null 2>&1

echo "Checking for issues..."
echo ""

ISSUES_FOUND=0

# Read each line and check for issues
while IFS= read -r line; do
  # Skip empty lines and comments
  [[ -z "$line" || "$line" =~ ^# ]] && continue

  # Extract key and value
  KEY="${line%%=*}"
  VALUE="${line#*=}"

  # Remove surrounding quotes if present
  VALUE="${VALUE#\"}"
  VALUE="${VALUE%\"}"
  VALUE="${VALUE#\'}"
  VALUE="${VALUE%\'}"

  ISSUE=""
  CLEAN_VALUE="$VALUE"

  # Check for trailing spaces
  if [[ "$VALUE" =~ [[:space:]]$ ]]; then
    ISSUE="trailing space"
    CLEAN_VALUE="${VALUE%"${VALUE##*[![:space:]]}"}"
  fi

  # Check for trailing slashes (for URLs)
  if [[ "$VALUE" =~ /$ ]]; then
    if [[ -z "$ISSUE" ]]; then
      ISSUE="trailing slash"
    else
      ISSUE="$ISSUE + trailing slash"
    fi
    CLEAN_VALUE="${CLEAN_VALUE%/}"
  fi

  # Check for trailing backslashes
  if [[ "$VALUE" =~ \\$ ]]; then
    if [[ -z "$ISSUE" ]]; then
      ISSUE="trailing backslash"
    else
      ISSUE="$ISSUE + trailing backslash"
    fi
    CLEAN_VALUE="${CLEAN_VALUE%\\}"
  fi

  if [[ -n "$ISSUE" ]]; then
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
    echo "ISSUE: $KEY has $ISSUE"
    echo "  Current: '$VALUE'"
    echo "  Clean:   '$CLEAN_VALUE'"

    if [[ "$FIX_MODE" == true ]]; then
      echo "  Fixing..."
      # Remove from all environments and re-add
      for ENV in production preview development; do
        vercel env rm "$KEY" "$ENV" --yes > /dev/null 2>&1 || true
        echo "$CLEAN_VALUE" | vercel env add "$KEY" "$ENV" > /dev/null 2>&1
      done
      echo "  Fixed!"
    fi
    echo ""
  fi
done < "$TEMP_ENV"

echo "----------------------------------------"
if [[ $ISSUES_FOUND -eq 0 ]]; then
  echo "No issues found. All environment variables are clean."
else
  echo "Found $ISSUES_FOUND issue(s)"
  if [[ "$FIX_MODE" == false ]]; then
    echo "Run with --fix to correct these issues"
  else
    echo "All issues have been fixed"
  fi
fi
