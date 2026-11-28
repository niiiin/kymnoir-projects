"""Regression tests for the offline audit projection."""
import json
import sys
import unittest
from pathlib import Path
from unittest import mock

with mock.patch.object(sys, "path", [str(Path(__file__).resolve().parents[1])] + sys.path):
    from audit_projection import audit_record


class AuditProjectionTests(unittest.TestCase):
    def test_known_outcomes(self):
        for status, called in (("denied", False), ("unavailable", False),
                               ("mock_failed", True), ("mock_completed", True)):
            with self.subTest(status=status):
                self.assertEqual(audit_record({"status": status, "mock_called": called}),
                                 {"event": "offline_dispatch", "outcome": status,
                                  "mock_called": called})

    def test_invalid_inputs_are_redacted(self):
        marker = "synthetic private detail"
        for value in (None, [], marker, {},
                      {"status": marker, "mock_called": False},
                      {"status": "denied", "mock_called": True},
                      {"status": "mock_completed", "mock_called": False},
                      {"status": "denied", "mock_called": 0},
                      {"status": [], "mock_called": False},
                      {"status": "denied", "mock_called": False, "payload": marker}):
            with self.subTest(value_type=type(value).__name__):
                record = audit_record(value)
                self.assertEqual(record, {"event": "offline_dispatch",
                                          "outcome": "invalid", "mock_called": False})
                self.assertNotIn(marker, json.dumps(record))

    def test_returns_independent_records(self):
        value = {"status": "denied", "mock_called": False}
        record = audit_record(value)
        record["outcome"] = "changed"
        self.assertEqual(audit_record(value)["outcome"], "denied")
        self.assertEqual(value, {"status": "denied", "mock_called": False})
