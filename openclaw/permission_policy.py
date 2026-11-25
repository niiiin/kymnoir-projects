"""Offline capability decision prototype; not an OpenClaw runtime hook.

Caller must supply a trusted agent identity and canonical action. A positive
decision is not owner approval or authorization to execute a tool.
"""
from types import MappingProxyType

_ALLOWED = MappingProxyType({
    "executive": frozenset({"summarize_approved_sources", "draft"}),
    "atlas": frozenset({"research_public_sources", "draft", "propose_code"}),
    "sanglung": frozenset({"draft", "research_public_sources"}),
    "technical": frozenset({"read_repo", "propose_code", "write_feature_branch"}),
})


def permits(agent_id, action):
    """Deny unknown identities, unknown actions and malformed input."""
    if type(agent_id) is not str or type(action) is not str:
        return False
    return action in _ALLOWED.get(agent_id, frozenset())


def manifest_matches(doc):
    """Check exact capability sets and workspace names; no I/O or side effects.

    This is a narrow check, not full manifest or filesystem validation.
    """
    if type(doc) is not dict or type(doc.get("agents")) is not list:
        return False
    agents = doc["agents"]
    if len(agents) != len(_ALLOWED):
        return False
    seen = set()
    for agent in agents:
        if type(agent) is not dict:
            return False
        identity = agent.get("id")
        if type(identity) is not str or identity not in _ALLOWED or identity in seen:
            return False
        seen.add(identity)
        if agent.get("workspace") != "workspaces/" + identity:
            return False
        allowed = agent.get("allowed")
        denied = agent.get("denied")
        for values in (allowed, denied):
            if type(values) is not list or any(type(v) is not str for v in values):
                return False
            if len(values) != len(set(values)):
                return False
        required = {"send", "publish", "payments", "production_deploy",
                    "read_guest_records" if identity == "sanglung" else "read_wallets"}
        if set(allowed) != _ALLOWED[identity] or not required <= set(denied):
            return False
        if set(allowed) & set(denied):
            return False
    return True
