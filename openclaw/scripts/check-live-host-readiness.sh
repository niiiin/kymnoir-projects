#!/usr/bin/env bash
# KYM CORE: read-only inventory for a newly provisioned Ubuntu host.
# No credentials, private IPs, tokens, or sensitive configuration are printed.
set -uo pipefail
printf 'KYM CORE host readiness (read-only)\n'
printf 'UTC: '; date -u +'%Y-%m-%dT%H:%M:%SZ'
printf 'Hostname: '; hostname
printf 'OS: '; . /etc/os-release && printf '%s %s\n' "$ID" "$VERSION_ID"
printf 'Architecture: '; uname -m
printf 'User: '; id -un
printf 'Root user: '; if [ "$(id -u)" -eq 0 ]; then echo 'YES (do not install OpenClaw as root)'; else echo no; fi
printf 'Available RAM: '; awk '/MemAvailable:/ {printf "%.0f MiB\n",$2/1024}' /proc/meminfo
printf 'Free root disk: '; df -h / | awk 'NR==2 {print $4}'
for cmd in git curl python3 node npm docker openclaw nginx certbot ufw; do
  if command -v "$cmd" >/dev/null 2>&1; then
    printf '%s: installed\n' "$cmd"
  else
    printf '%s: missing\n' "$cmd"
  fi
done
printf 'HTTPS local probe: '
if command -v curl >/dev/null 2>&1; then
  curl --silent --show-error --max-time 5 --output /dev/null --write-out 'HTTP %{http_code}\n' https://localhost/ 2>/dev/null || echo 'not verified'
else echo 'curl missing'; fi
printf 'OpenClaw gateway: '
if command -v openclaw >/dev/null 2>&1; then openclaw gateway status 2>&1 | head -n 12; else echo 'not installed'; fi
printf 'Done. No configuration changes made. Do not paste credentials or tokens.\n'
