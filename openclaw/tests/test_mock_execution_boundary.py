"""Offline proof of a proposed authorization-before-handler boundary.

This test-only harness never imports or executes real tools. It is not a
runtime hook, and agent identity must ultimately come from trusted context.
"""
import sys
import unittest
from pathlib import Path
from unittest import mock

with mock.patch.object(sys, "path", [str(Path(__file__).resolve().parents[1])] + sys.path):
    from simulated_dispatch import simulate


def mock_dispatch(agent, action, handlers):
    """Return a minimal audit outcome; never include request payloads."""
    decision = simulate(agent, action)
    if decision["status"] != "simulated":
        return {"status": "denied", "mock_called": False}
    handler = handlers.get(action)
    if handler is None:
        return {"status": "unavailable", "mock_called": False}
    try:
        handler()
    except Exception:
        return {"status": "mock_failed", "mock_called": True}
    return {"status": "mock_completed", "mock_called": True}


class MockExecutionBoundaryTests(unittest.TestCase):
    def test_denied_never_reaches_registered_handler(self):
        for agent, action in (
            ("atlas", "write_feature_branch"),
            ("executive", "send"),
            ("technical", "production_deploy"),
            ("sanglung", "read_guest_records"),
            ("unknown", "draft"),
            (None, "draft"),
        ):
            with self.subTest(agent=agent, action=action):
                handler = mock.Mock()
                self.assertEqual(mock_dispatch(agent, action, {action: handler}),
                                 {"status": "denied", "mock_called": False})
                handler.assert_not_called()

    def test_malformed_action_never_reads_registry(self):
        registry = mock.Mock()
        self.assertEqual(mock_dispatch("atlas", [], registry),
                         {"status": "denied", "mock_called": False})
        registry.get.assert_not_called()

    def test_permitted_calls_only_selected_mock_once(self):
        selected, other = mock.Mock(), mock.Mock()
        self.assertEqual(mock_dispatch("atlas", "draft",
                                       {"draft": selected, "send": other}),
                         {"status": "mock_completed", "mock_called": True})
        selected.assert_called_once_with()
        other.assert_not_called()

    def test_missing_handler_fails_closed(self):
        self.assertEqual(mock_dispatch("atlas", "draft", {}),
                         {"status": "unavailable", "mock_called": False})

    def test_handler_error_does_not_leak_details_or_retry(self):
        handler = mock.Mock(side_effect=RuntimeError("synthetic private detail"))
        self.assertEqual(mock_dispatch("atlas", "draft", {"draft": handler}),
                         {"status": "mock_failed", "mock_called": True})
        handler.assert_called_once_with()
