#!/usr/bin/env python3
"""Offline verification of proposed SSH target metadata; never connects to a host.

Usage: python3 openclaw/tools/verify_ssh_target.py openclaw/examples/ssh-target.example.json
The file is deliberately non-secret. Host-key fingerprints must be independently
confirmed using the Vultr console before any connection.
"""
import ipaddress
import json
import pathlib
import re
import sys

LEGACY_IP = ".".join(("95", "179", "138", "254"))
FINGERPRINT = re.compile(r"^SHA256:[A-Za-z0-9+/]{43}$")

def validate(data):
    errors = []
    if not isinstance(data, dict):
        return ["expected a JSON object"]
    if data.get("provider") != "vultr":
        errors.append("provider must be vultr")
    if data.get("account_label") != "90nize":
        errors.append("account_label must be 90nize")
    if data.get("host") in (None, "", "REPLACE_WITH_NEW_SERVER_IP", LEGACY_IP):
        errors.append("replace placeholder or retired server address with independently verified new host")
    else:
        try:
            ip = ipaddress.ip_address(data["host"])
            if not ip.is_global:
                errors.append("host must be a globally routable IP")
        except (ValueError, TypeError):
            errors.append("host must be a valid IP address")
    if data.get("ssh_user") != "kymdeploy":
        errors.append("SSH user must be restricted kymdeploy (after verified creation)")
    if not FINGERPRINT.fullmatch(str(data.get("host_key_fingerprint", ""))):
        errors.append("host_key_fingerprint must be independently verified SHA256 fingerprint")
    if data.get("host_key_verified_out_of_band") is not True:
        errors.append("host key must be independently verified in Vultr console")
    if data.get("owner_approved") is not True:
        errors.append("owner approval required before server changes")
    if data.get("deployment_enabled") is not False:
        errors.append("deployment_enabled must remain false during preparation")
    return errors

def main(argv):
    if len(argv) != 2:
        print("Usage: verify_ssh_target.py <target.json>", file=sys.stderr)
        return 2
    try:
        data = json.loads(pathlib.Path(argv[1]).read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        print(f"ERROR: cannot read target: {exc}", file=sys.stderr)
        return 2
    errors = validate(data)
    for err in errors:
        print(f"FAIL: {err}")
    if errors:
        return 1
    print("PASS: metadata validated offline; NO network connection or server state verified")
    return 0

if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
