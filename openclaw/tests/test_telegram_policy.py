"""Offline, dependency-free checks for the disabled Telegram planning policy."""
import copy
import importlib.util
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("verify_telegram_policy", ROOT / "tools" / "verify_telegram_policy.py")
policy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(policy)
BASE = json.loads((ROOT / "examples" / "telegram-access.example.json").read_text(encoding="utf-8"))

class TelegramPolicyTests(unittest.TestCase):
    def test_baseline(self):
        self.assertEqual(policy.validate(BASE), [])
    def test_enabled_rejected(self):
        data = copy.deepcopy(BASE); data["enabled"] = True
        self.assertTrue(policy.validate(data))
    def test_token_rejected(self):
        data = copy.deepcopy(BASE); data["bot_token"] = "test-token"
        self.assertTrue(policy.validate(data))
    def test_group_access_rejected(self):
        data = copy.deepcopy(BASE); data["group_policy"] = "open"
        self.assertTrue(policy.validate(data))
    def test_user_allowlist_rejected_before_approval(self):
        data = copy.deepcopy(BASE); data["allowed_user_ids"] = [12345]
        self.assertTrue(policy.validate(data))
    def test_unapproved_sending_rejected(self):
        data = copy.deepcopy(BASE); data["send_without_approval"] = True
        self.assertTrue(policy.validate(data))
    def test_message_body_logging_rejected(self):
        data = copy.deepcopy(BASE); data["log_message_bodies"] = True
        self.assertTrue(policy.validate(data))
    def test_public_webhook_rejected(self):
        data = copy.deepcopy(BASE); data["webhook_public_endpoint"] = True
        self.assertTrue(policy.validate(data))
    def test_unknown_key_rejected(self):
        data = copy.deepcopy(BASE); data["disable_safety"] = True
        self.assertTrue(policy.validate(data))
    def test_wrong_type_rejected(self):
        data = copy.deepcopy(BASE); data["enabled"] = 0
        self.assertTrue(policy.validate(data))
    def test_missing_key_rejected(self):
        data = copy.deepcopy(BASE); del data["dm_policy"]
        self.assertTrue(policy.validate(data))
    def test_invalid_root_rejected(self):
        self.assertTrue(policy.validate([]))

if __name__ == "__main__":
    unittest.main()
