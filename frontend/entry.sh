#!/bin/sh
set -e  # Exit immediately if any command fails

# ----------------------------
# Ensure plugin nginx config directory exists
# ----------------------------
mkdir -p /etc/nginx/conf.d/plugins

# Choose template based on whether SSL certs are present
PORTAL_BACKEND_HOST="${PORTAL_BACKEND_HOST:-localhost}"
CERT_FILE="/etc/nginx/certs/${PORTAL_BACKEND_HOST}.crt"
KEY_FILE="/etc/nginx/certs/${PORTAL_BACKEND_HOST}.key"

if [ -f "$CERT_FILE" ] && [ -f "$KEY_FILE" ]; then
    echo "SSL certs found for ${PORTAL_BACKEND_HOST}, using HTTPS mode."
    TEMPLATE=/etc/nginx/conf.d/nginx.ssl.conf.template
else
    echo "No SSL certs found for ${PORTAL_BACKEND_HOST}, using HTTP mode (local development)."
    TEMPLATE=/etc/nginx/conf.d/nginx.http.conf.template
fi

export MAX_UPLOAD_MB="${MAX_UPLOAD_MB:-20480}"
export MAX_PART_SIZE_MB="${MAX_PART_SIZE_MB:-16}"

envsubst '${BACKEND_PORT} ${PORTAL_BACKEND_HOST} ${MAX_UPLOAD_MB} ${MAX_PART_SIZE_MB}' < "$TEMPLATE" > /etc/nginx/conf.d/default.conf

# ----------------------------
# Start Nginx in the foreground
# ----------------------------
# -g 'daemon off;' keeps Nginx running in the foreground so the container doesn't exit
echo "Starting Nginx..."
nginx -g "daemon off;"
