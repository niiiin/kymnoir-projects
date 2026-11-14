#!/usr/bin/env python3
"""Offline safety regression tests for KYM CORE planning manifests.

Run from any directory: python3 openclaw/tests/test_planning_manifests.py
No network, OpenClaw installation, credentials, or third-party packages needed.
These JSON files are policy *examples*, not runtime-enforced OpenClaw settings.
"""
import json
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
EXAMPLES = ROOT / "examples"
DENIED = {"send", "publish", "payments", "production_deploy"}
APPROVALS = {
    "external_messages", "publications", "spending",
    "production_changes", "credential_changes", "sensitive_data_export",
}


def load(name):
    return json.loads((EXAMPLES / name).read_text(encoding="utf-8"))


class PlanningManifestTests(unittest.TestCase):
    def test_all_example_json_parses(self):
        examples = sorted(EXAMPLES.glob("*.json"))
        self.assertTrue(examples, "No JSON examples found")
        for path in examples:
            with self.subTest(path=path.name):
                self.assertIsInstance(load(path.name), dict)

    def test_agent_isolation(self):
        doc = load("agent-boundaries.example.json")
        self.assertEqual(doc["mode"], "development_only")
        self.assertEqual(doc["gateway"]["bind"], "loopback")
        self.assertIs(doc["gateway"]["public_dashboard"], False)
        self.assertIs(doc["credentials_in_repository"], False)
        self.assertTrue(APPROVALS.issubset(set(doc["approval_required"])))
        agents = doc["agents"]
        self.assertGreaterEqual(len(agents), 2)
        ids = [agent["id"] for agent in agents]
        self.assertEqual(len(ids), len(set(ids)), "Duplicate agent IDs")
        workspaces = [agent["workspace"] for agent in agents]
        self.assertEqual(len(workspaces), len(set(workspaces)), "Shared workspaces")
        for agent in agents:
            with self.subTest(agent=agent["id"]):
                workspace = pathlib.PurePosixPath(agent["workspace"])
                self.assertFalse(workspace.is_absolute())
                self.assertNotIn("..", workspace.parts)
                self.assertEqual(workspace.parts[0], "workspaces")
                allowed = set(agent["allowed"])
                denied = set(agent["denied"])
                self.assertFalse(allowed & denied)
                self.assertTrue(DENIED.issubset(denied))
                self.assertFalse(DENIED & allowed)

    def test_telegram_remains_disabled(self):
        doc = load("telegram-access.example.json")
        self.assertEqual(doc["mode"], "disabled_until_owner_approval")
        self.assertEqual(doc["channel"], "telegram")
        self.assertEqual(doc["bot_token_source"], "runtime_secret_only")
        self.assertEqual(doc["bot_token"], "")
        self.assertIs(doc["enabled"], False)
        self.assertEqual(doc["group_policy"], "disabled")
        self.assertEqual(doc["dm_policy"], "pairing")
        for key in ("allowed_user_ids", "allowed_chat_ids"):
            self.assertEqual(doc[key], [])
        for key in ("allow_group_invites", "send_without_approval",
                    "external_tool_calls", "log_message_bodies",
                    "webhook_public_endpoint"):
            self.assertIs(doc[key], False)
        self.assertEqual(doc["owner_approval_record"], "")


if __name__ == "__main__":
    unittest.main()
