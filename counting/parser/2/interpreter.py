import regex as re

def lexer(contents):
    lines = contents.split('\n')

    nLines = []
    for line in lines:
        chars = list(line)
        temp_str = ""
        tokens = []

        for char in chars:
            if char == ",":
                tokens.append(temp_str)
                temp_str = ""
            else:
                temp_str += char

        tokens.append(temp_str)
        items = []

        pattern = r"\b\w+\s*[иили]+(\d+)"
        pattern_cond = r"(?P<word>\w+)+(?P<sign>\s*[иили])+(?P<num>\d+)"

        for token in tokens:    
            if re.match(r"[.а-яА-Я]+", token):
                match = re.search(pattern, token)
                if re.search(pattern, token):
                    match_cond = re.match(pattern_cond, match.group(0))
                    if match_cond:
                        items.append(("word", match_cond.group('word')))
                        items.append(("sign", match_cond.group('sign')))
                        items.append(("num", match_cond.group('num')))

            elif re.match(r"[.-0-9]", token):
                token = re.sub(r"[^0-9-]", "", token)
                items.append(("number", token))

        nLines.append(items)

    return nLines


def parse(file):
    contents = open(file, 'r').read()
    lines = lexer(contents)

    return lines