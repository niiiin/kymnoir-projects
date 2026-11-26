"""Exercise the offline dispatch boundary, without real tools."""
import sys
import unittest
from pathlib import Path
from unittest import mock

with mock.patch.object(sys, "path", [str(Path(__file__).resolve().parents[1])] + sys.path):
    from simulated_dispatch import simulate


class DispatchTests(unittest.TestCase):
    def test_allowed_is_only_simulated(self):
        for agent, action in (("executive", "draft"), ("atlas", "propose_code"),
                              ("sanglung", "research_public_sources"),
                              ("technical", "write_feature_branch")):
            with self.subTest(agent=agent):
                self.assertEqual(simulate(agent, action),
                                 {"status": "simulated", "executed": False, "action": action})

    def test_denied_has_no_execution(self):
        for agent, action in (("atlas", "write_feature_branch"), ("technical", "production_deploy"),
                              ("executive", "send"), ("sanglung", "read_guest_records"),
                              ("unknown", "draft"), (None, "draft"), ("atlas", [])):
            with self.subTest(agent=agent, action=action):
                self.assertEqual(simulate(agent, action), {"status": "denied", "executed": False})
