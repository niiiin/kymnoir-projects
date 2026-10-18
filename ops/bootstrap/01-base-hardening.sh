#!/usr/bin/env bash
# KYMCORE Ubuntu 24.04 base setup — draft for owner-reviewed execution.
# This script does not create user accounts, change passwords, change sshd,
# install agent credentials, open web ports, provision paid services, or deploy sites.
set -Eeuo pipefail
if [[ "${EUID}" -ne 0 ]]; then echo "Run with sudo, after reviewing the script."; exit 1; fi
if [[ "$(lsb_release -is)" != "Ubuntu" ]]; then echo "Ubuntu required."; exit 1; fi
echo "Starting KYMCORE baseline system preparation..."
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y ca-certificates curl git ufw fail2ban unattended-upgrades
# Keep SSH available; never disable password login or root before a key-based
# alternative AND the provider rescue console have been tested.
ufw allow 22/tcp comment 'SSH initial access'
ufw --force enable
systemctl enable --now fail2ban
systemctl enable --now unattended-upgrades
echo "=== Non-secret verification ==="
lsb_release -ds
hostname
ufw status verbose
systemctl is-active fail2ban
systemctl is-active unattended-upgrades
echo "KYMCORE baseline finished. NEXT: dedicated limited deploy identity, tested key"
echo "access, backup restore, and staged GitHub Actions credentials — each reviewed separately."
