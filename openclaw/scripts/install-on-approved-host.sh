#!/usr/bin/env bash
# Explicitly interactive installation on a verified, approved Ubuntu host.
# No automatic execution from GitHub; never run on an unverified production host.
set -euo pipefail
echo "KYM CORE / OpenClaw interactive install"
echo "This downloads and runs the official OpenClaw installer and starts onboarding."
echo "It may modify the current machine and install system packages."
echo "Do not run until the host, backups, service isolation and access have been verified."
read -r -p 'Type INSTALL OPENCLAW to proceed: ' answer
if [[ "$answer" != "INSTALL OPENCLAW" ]]; then
  echo "Cancelled; no installation attempted."
  exit 1
fi
if [[ "$(id -u)" -eq 0 ]]; then
  echo "Refusing to install as root. Use a dedicated non-root account."
  exit 1
fi
curl --fail --silent --show-error --location https://openclaw.ai/install.sh --output /tmp/kymcore-openclaw-install.sh
echo "Official installer downloaded to /tmp/kymcore-openclaw-install.sh"
echo "Review it before executing. Installer execution is deliberately not automated."
echo "To continue manually after review: bash /tmp/kymcore-openclaw-install.sh"
