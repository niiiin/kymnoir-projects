#!/usr/bin/env python3
"""Offline safety checks for the KYM CORE OpenClaw bootstrap tree.

Standard library only; no network calls, credentials, or production access.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = (
    "README.md",
    "AGENT_POLICY.md",
    "DEPLOYMENT_CHECKLIST.md",
    "HOSTING_DECISION.md",
    "scripts/preflight.sh",
    "scripts/install-on-approved-host.sh",
)
DANGEROUS_PATTERNS = {
    "private SSH key": r"-----BEGIN (?:OPENSSH|RSA|EC|DSA) PRIVATE KEY-----",
    "GitHub personal access token": r"gh[pousr]_[A-Za-z0-9_]{20,}",
    "OpenAI API key": r"sk-(?:proj-)?[A-Za-z0-9_-]{20,}",
    "hardcoded legacy Vultr IP": r"95\.179\.138\.254",
    "automatic install execution": r"(?:curl|wget)\s+[^\n]*\|\s*(?:ba)?sh",
    "unreviewed installer execution": r"^\s*bash\s+/tmp/kymcore-openclaw-install\.sh\s*$",
}
# Documentation can mention the old host and command examples; only executable
# scripts and machine-readable configuration are scanned for these patterns.
SCAN_SUFFIXES = {".sh", ".py", ".yml", ".yaml", ".json", ".toml", ".env"}

def check(root=ROOT):
    errors = []
    for rel in REQUIRED:
        if not (root / rel).is_file():
            errors.append(f"missing required file: {rel}")
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix not in SCAN_SUFFIXES:
            continue
        if path.name == "validate_bootstrap.py":
            continue
        if "__pycache__" in path.parts:
            continue
        body = path.read_text(encoding="utf-8")
        for name, pattern in DANGEROUS_PATTERNS.items():
            if re.search(pattern, body, flags=re.MULTILINE):
                errors.append(f"{path.relative_to(root)}: {name}")
    return errors

if __name__ == "__main__":
    problems = check()
    for problem in problems:
        print("FAIL:", problem)
    if problems:
        sys.exit(1)
    print("PASS: bootstrap files present; no blocked patterns in executable/config files")
