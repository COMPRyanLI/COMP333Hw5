
def test_string(test_num, expected, actual):#directly compare two strings here
    if expected == actual:
        print(f"Test {test_num} passed! `{actual}` matches `{expected}`.")
    else:
        print(f"Test {test_num} failed. Expected: `{expected}`. Got: `{actual}`.")

def test_strlist(test_num, expected_list, actual_list): #use for loop to compare every element in the strlist
    for i in range(len(expected_list)):
        expected = expected_list[i]
        actual = actual_list[i]
        if expected == actual:
            print(f"Part {i} in test {test_num} passed! `{actual}` matches `{expected}`.")
        else:
            print(f"Part {i} in test {test_num} failed. Expected: `{expected}`. Got: `{actual}`.")

def test_int(test_num, expected, actual):#directly compare two int
    if expected == actual:
        print(f"Test {test_num} passed! `{actual}` matches `{expected}`.")
    else:
        print(f"Test {test_num} failed. Expected: `{expected}`. Got: `{actual}`.")

def test_intlist(test_num, expected_list, actual_list):#use for loop two compare two intlists
    all_passed = True
    for i in range(len(expected_list)):
        expected = expected_list[i]
        actual = actual_list[i]
        if expected == actual:
            print(f"Part {i} in test {test_num} passed! `{actual}` matches `{expected}`.")
        else:
            all_passed = False
            print(f"Part {i} in test {test_num} failed. Expected: `{expected}`. Got: `{actual}`.")
    if not all_passed:
        print(f"Test {test_num} in test {test_num} failed. Expected: `{expected_list}`. Got: `{actual_list}`.")
    else:
        print(f"Test {test_num} passed!")

# This would be the provided code with functions to test
def string_capitalizer(tobecapitalized):
    if tobecapitalized == "":
        return tobecapitalized
    i = 0
    try:
        tbclist = [*tobecapitalized]
        while i < (len(tbclist)):
            if i == 0 or i == (len(tbclist) - 1):
                tbclist[i] = tbclist[i].upper()
            i = i + 1
        tobecapitalized = ''.join(tbclist)
        return tobecapitalized
    except:
        # If failure, return the input as is.
        return tobecapitalized

def capitalize_list(slist):
    i = 0
    while i < len(slist):
        current_string = slist[i]
        slist[i] = string_capitalizer(current_string)
        i = i + 1
    return slist

def integer_manipulator(n):
    try:
        n = ((n*n)*2)//3
        return n
    except:
        # If failure, return the input as is.
        return n

def manipulate_list(intlist):
    i = 0
    while i < len(intlist):
        intlist[i] = integer_manipulator(intlist[i])
        i = i + 1
    return intlist

# Testing the functions using the code provided in docx file
print("\nString Capitalizer Tests:")
test_string("0", "TwO", string_capitalizer("two"))
test_string("1", "C", string_capitalizer("c"))
test_string("2", "FouR", string_capitalizer(4))
test_string("3", "", string_capitalizer(""))

print("\nList Capitalizer Tests:")
test_strlist("0", ["TwO","C","FouR",""], capitalize_list(["two","c",4,""]))

print("\nInteger Manipulator Tests:")
test_int("0", 66, integer_manipulator(10))
test_int("1", 2, integer_manipulator(2))
test_int("2", 6, integer_manipulator(3))
test_int("3", 0, integer_manipulator(0))
test_int("4", 1, integer_manipulator("three"))

print("\nManipulate List Tests:")
test_intlist("0", [66,2,6,0,1], manipulate_list([10,2,3,0,"three"]))
