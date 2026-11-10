"""Tests for the development-only agent boundaries manifest."""
import copy
import importlib.util
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("verify_agent_boundaries", ROOT / "tools" / "verify_agent_boundaries.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
BASE = json.loads((ROOT / "examples" / "agent-boundaries.example.json").read_text(encoding="utf-8"))

class AgentBoundaryTests(unittest.TestCase):
    def test_valid_manifest(self):
        self.assertEqual(module.validate(BASE), [])
    def test_public_gateway_rejected(self):
        data = copy.deepcopy(BASE)
        data["gateway"]["bind"] = "0.0.0.0"
        self.assertTrue(module.validate(data))
    def test_unapproved_payment_rejected(self):
        data = copy.deepcopy(BASE)
        data["agents"][0]["allowed"].append("payments")
        self.assertTrue(module.validate(data))
    def test_missing_send_denial_rejected(self):
        data = copy.deepcopy(BASE)
        data["agents"][1]["denied"].remove("send")
        self.assertTrue(module.validate(data))
    def test_shared_workspace_rejected(self):
        data = copy.deepcopy(BASE)
        data["agents"][1]["workspace"] = data["agents"][0]["workspace"]
        self.assertTrue(module.validate(data))
    def test_duplicate_agent_rejected(self):
        data = copy.deepcopy(BASE)
        data["agents"][1]["id"] = "executive"
        self.assertTrue(module.validate(data))
    def test_missing_approval_rejected(self):
        data = copy.deepcopy(BASE)
        data["approval_required"].remove("sensitive_data_export")
        self.assertTrue(module.validate(data))
    def test_credentials_rejected(self):
        data = copy.deepcopy(BASE)
        data["credentials_in_repository"] = True
        self.assertTrue(module.validate(data))
    def test_malformed_rejected(self):
        self.assertTrue(module.validate([]))

if __name__ == "__main__":
    unittest.main()
