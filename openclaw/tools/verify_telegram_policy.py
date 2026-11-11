#!/usr/bin/env python3
"""Fail-closed validation for KYM CORE's NON-RUNTIME Telegram planning manifest."""
import json
import pathlib
import sys

def validate(data):
    if not isinstance(data, dict):
        return ["policy must be a JSON object"]
    errors = []
    required = {
        "schema_version": 1,
        "mode": "disabled_until_owner_approval",
        "channel": "telegram",
        "bot_token_source": "runtime_secret_only",
        "bot_token": "",
        "enabled": False,
        "dm_policy": "pairing",
        "group_policy": "disabled",
        "allowed_user_ids": [],
        "allowed_chat_ids": [],
        "allow_group_invites": False,
        "send_without_approval": False,
        "external_tool_calls": False,
        "log_message_bodies": False,
        "webhook_public_endpoint": False,
        "owner_approval_record": "",
    }
    for key, expected in required.items():
        if key not in data or type(data[key]) is not type(expected) or data[key] != expected:
            errors.append(f"{key}: expected disabled planning value")
    # Fail closed on unreviewed fields rather than letting an unknown override slip through.
    permitted = set(required) | {"notes"}
    unknown = set(data) - permitted
    if unknown:
        errors.append("unexpected keys: " + ", ".join(sorted(unknown)))
    if "notes" in data and not isinstance(data["notes"], str):
        errors.append("notes must be text")
    return errors

def main(argv):
    if len(argv) != 2:
        print("Usage: verify_telegram_policy.py <planning-manifest.json>", file=sys.stderr)
        return 2
    try:
        data = json.loads(pathlib.Path(argv[1]).read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    errors = validate(data)
    for error in errors:
        print("FAIL:", error)
    if errors:
        return 1
    print("PASS: disabled Telegram planning policy; NOT an installed OpenClaw configuration")
    return 0

if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
