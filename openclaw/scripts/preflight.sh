#!/usr/bin/env bash
# Read-only KYM CORE Ubuntu preflight. Does not install or modify anything.
set -u
printf '\nKYM CORE / OpenClaw host preflight (read-only)\n'
printf 'UTC time: '; date -u '+%Y-%m-%d %H:%M:%S UTC'
printf 'Host: '; hostname
printf 'User: '; id -un
printf 'OS: '; . /etc/os-release 2>/dev/null && echo "${PRETTY_NAME:-unknown}" || echo unknown
printf 'Kernel: '; uname -r
printf 'Architecture: '; uname -m
printf 'Memory:\n'; free -h 2>/dev/null || true
printf 'Disk:\n'; df -h / 2>/dev/null || true
for cmd in node npm docker git openclaw; do
  if command -v "$cmd" >/dev/null 2>&1; then
    printf '%s: installed (%s)\n' "$cmd" "$(command -v "$cmd")"
  else
    printf '%s: absent\n' "$cmd"
  fi
done
if command -v openclaw >/dev/null 2>&1; then
  printf 'OpenClaw version: '; openclaw --version || true
  printf 'Gateway status:\n'; openclaw gateway status || true
fi
printf '\nThis script made no changes. Do not share secrets or full environment dumps.\n'
