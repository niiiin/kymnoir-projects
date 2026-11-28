"""Offline audit projection: fixed vocabulary, no payloads, identifiers or I/O.

This is not a runtime logger. Callers must not log raw inputs separately.
Unknown or inconsistent outcomes collapse to a fixed invalid outcome.
"""
from types import MappingProxyType

_OUTCOMES = MappingProxyType({
    "denied": False,
    "unavailable": False,
    "mock_failed": True,
    "mock_completed": True,
})


def audit_record(outcome):
    """Return only a fixed event name, outcome and synthetic invocation flag."""
    invalid = {"event": "offline_dispatch", "outcome": "invalid",
               "mock_called": False}
    if type(outcome) is not dict or len(outcome) != 2:
        return invalid
    if any(type(key) is not str for key in outcome):
        return invalid
    if set(outcome) != {"status", "mock_called"}:
        return invalid
    status, called = outcome["status"], outcome["mock_called"]
    if type(status) is not str or type(called) is not bool:
        return invalid
    if status not in _OUTCOMES or _OUTCOMES[status] is not called:
        return invalid
    return {"event": "offline_dispatch", "outcome": status,
            "mock_called": called}
