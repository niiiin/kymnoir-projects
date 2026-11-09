"""Offline tests for proposed SSH target guardrails."""
import importlib.util
from pathlib import Path
import unittest

MODULE = Path(__file__).resolve().parents[1] / "tools" / "verify_ssh_target.py"
spec = importlib.util.spec_from_file_location("verify_ssh_target", MODULE)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

GOOD = {
    "provider": "vultr", "account_label": "90nize", "host": "8.8.8.8",
    "ssh_user": "kymdeploy",
    "host_key_fingerprint": "SHA256:" + "A" * 43,
    "host_key_verified_out_of_band": True, "owner_approved": True,
    "deployment_enabled": False,
}

class TargetTests(unittest.TestCase):
    def test_valid_metadata(self):
        self.assertEqual(module.validate(GOOD), [])
    def test_legacy_host_rejected(self):
        self.assertTrue(module.validate({**GOOD, "host": module.LEGACY_IP}))
    def test_private_host_rejected(self):
        self.assertTrue(module.validate({**GOOD, "host": "10.0.0.2"}))
    def test_unverified_host_key_rejected(self):
        self.assertTrue(module.validate({**GOOD, "host_key_verified_out_of_band": False}))
    def test_missing_owner_approval_rejected(self):
        self.assertTrue(module.validate({**GOOD, "owner_approved": False}))
    def test_deployment_switch_rejected(self):
        self.assertTrue(module.validate({**GOOD, "deployment_enabled": True}))
    def test_wrong_account_rejected(self):
        self.assertTrue(module.validate({**GOOD, "account_label": "other"}))
    def test_bad_fingerprint_rejected(self):
        self.assertTrue(module.validate({**GOOD, "host_key_fingerprint": "SHA256:placeholder"}))
    def test_non_object_rejected(self):
        self.assertTrue(module.validate([]))

if __name__ == "__main__":
    unittest.main()
