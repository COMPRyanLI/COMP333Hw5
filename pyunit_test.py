import pytest
from unit_testing_sample_code import string_capitalizer, capitalize_list, integer_manipulator, manipulate_list

def test_string_capitalizer():
    assert string_capitalizer("two") == "TwO"
    assert string_capitalizer("c") == "C"
    # handle the error expected when passing an integer
    with pytest.raises(TypeError):
        string_capitalizer(4)
    assert string_capitalizer("") == ""

def test_capitalize_list():
    assert capitalize_list(["two","c",4,""]) == ["TwO","C","FouR",""]
    with pytest.raises(TypeError):
        capitalize_list(["two", "c", 4, ""])

def test_integer_manipulator():
    assert integer_manipulator(10) == 66
    assert integer_manipulator(2) == 2
    assert integer_manipulator(3) == 6
    assert integer_manipulator(0) == 0
    with pytest.raises(TypeError):
        integer_manipulator("three")

def test_manipulate_list():
    assert manipulate_list([10,2,3,0,"three"]) == [66,2,6,0,1]
    with pytest.raises(TypeError):
        manipulate_list([10,2,3,0,"three"])
