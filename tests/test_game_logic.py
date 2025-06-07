import unittest
import sys
import os

# Add the parent directory to the Python path to import app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import apply_rule1, apply_rule2, apply_rule3, apply_rule4

class TestMIURules(unittest.TestCase):

    def test_apply_rule1(self):
        self.assertEqual(apply_rule1("MI"), "MIU", "Rule 1: MI -> MIU")
        self.assertEqual(apply_rule1("MIU"), "MIU", "Rule 1: MIU -> MIU (no change)")
        self.assertEqual(apply_rule1("M"), "M", "Rule 1: M -> M (no change)")
        self.assertEqual(apply_rule1("MII"), "MIIU", "Rule 1: MII -> MIIU")

    def test_apply_rule2(self):
        self.assertEqual(apply_rule2("MI"), "MII", "Rule 2: MI -> MII")
        self.assertEqual(apply_rule2("MIU"), "MIUIU", "Rule 2: MIU -> MIUIU")
        self.assertEqual(apply_rule2("M"), "M", "Rule 2: M -> M (no change, x is empty)")
        self.assertEqual(apply_rule2("MU"), "MUU", "Rule 2: MU -> MUU")
        self.assertEqual(apply_rule2("I"), "I", "Rule 2: I -> I (not starting with M)")

    def test_apply_rule3(self):
        self.assertEqual(apply_rule3("MIII"), "MU", "Rule 3: MIII -> MU")
        self.assertEqual(apply_rule3("MIIII"), "MUI", "Rule 3: MIIII -> MUI (first occurrence)")
        self.assertEqual(apply_rule3("MIU"), "MIU", "Rule 3: MIU -> MIU (no III)")
        self.assertEqual(apply_rule3("IIIM"), "UM", "Rule 3: IIIM -> UM")
        self.assertEqual(apply_rule3("MIIIMIII"), "MUMIII", "Rule 3: MIIIMIII -> MUMIII (first occurrence)")

    def test_apply_rule4(self):
        self.assertEqual(apply_rule4("MUU"), "M", "Rule 4: MUU -> M")
        self.assertEqual(apply_rule4("MIUU"), "MI", "Rule 4: MIUU -> MI")
        self.assertEqual(apply_rule4("MUUU"), "MU", "Rule 4: MUUU -> MU (first occurrence)")
        self.assertEqual(apply_rule4("UMUU"), "UM", "Rule 4: UMUU -> UM")
        self.assertEqual(apply_rule4("MUI"), "MUI", "Rule 4: MUI -> MUI (no UU)")

if __name__ == '__main__':
    unittest.main()
