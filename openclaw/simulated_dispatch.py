"""Offline dispatch simulation. No real tools, I/O, credentials or runtime hooks.

Identity must come from a trusted caller, never from a model-generated payload.
Only synthetic results are returned; even permitted writes are not executed.
"""
from permission_policy import permits

def simulate(agent_id, action):
    if not permits(agent_id, action):
        return {"status": "denied", "executed": False}
    return {"status": "simulated", "executed": False, "action": action}
