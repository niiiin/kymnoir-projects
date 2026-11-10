#!/usr/bin/env python3
"""Validate a proposed, non-deployable KYM CORE agent boundary manifest."""
import json
import pathlib
import sys

EXPECTED = {"executive", "atlas", "sanglung", "technical"}
REQUIRED_DENIALS = {"send", "publish", "payments", "production_deploy"}
REQUIRED_APPROVALS = {"external_messages", "publications", "spending", "production_changes", "credential_changes", "sensitive_data_export"}

def validate(data):
    errors = []
    if not isinstance(data, dict):
        return ["manifest must be an object"]
    if data.get("schema_version") != 1 or data.get("mode") != "development_only":
        errors.append("schema_version=1 and mode=development_only required")
    gateway = data.get("gateway")
    if not isinstance(gateway, dict) or gateway.get("bind") != "loopback" or gateway.get("public_dashboard") is not False:
        errors.append("gateway must be private, bound to loopback")
    if data.get("credentials_in_repository") is not False:
        errors.append("credentials_in_repository must be false")
    approvals = data.get("approval_required")
    if not isinstance(approvals, list) or not REQUIRED_APPROVALS.issubset(set(str(x) for x in approvals)):
        errors.append("mandatory approval categories missing")
    agents = data.get("agents")
    if not isinstance(agents, list):
        return errors + ["agents must be an array"]
    ids = []
    workspaces = []
    for agent in agents:
        if not isinstance(agent, dict):
            errors.append("agent must be an object")
            continue
        ident = agent.get("id")
        ids.append(ident)
        ws = agent.get("workspace")
        workspaces.append(ws)
        if not isinstance(ws, str) or ws != f"workspaces/{ident}":
            errors.append(f"{ident}: dedicated workspace required")
        allowed = agent.get("allowed")
        denied = agent.get("denied")
        if not isinstance(allowed, list) or not isinstance(denied, list):
            errors.append(f"{ident}: allowed/denied must be arrays")
            continue
        if set(allowed) & set(denied):
            errors.append(f"{ident}: conflicting permissions")
        if not REQUIRED_DENIALS.issubset(set(denied)):
            errors.append(f"{ident}: mandatory denials missing")
        if any(x in allowed for x in ("*", "shell", "root", "unrestricted_network", "production_deploy", "send", "payments")):
            errors.append(f"{ident}: excessive allowed permission")
    if set(ids) != EXPECTED or len(ids) != len(EXPECTED):
        errors.append("exactly four uniquely identified agents required")
    if len(workspaces) != len(set(str(x) for x in workspaces)):
        errors.append("workspace collision")
    return errors

def main(argv):
    if len(argv) != 2:
        print("Usage: verify_agent_boundaries.py <manifest.json>", file=sys.stderr)
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
    print("PASS: offline policy structure validated; no actual OpenClaw permissions configured")
    return 0

if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
