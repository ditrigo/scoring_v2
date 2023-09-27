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

        pattern = r"условие\((.*?),\d+,-\d+\)\)"

        for token in tokens:    
            
            if re.match(r"[.а-яА-Я]+", token):
                token = token.replace("условие(", "")
                token = token.replace(" и ", " AND ")
                token = token.replace(" или ", " OR ")
                items.append(("word", token))

            elif re.match(r"[.-0-9]", token):
                token = re.sub(r"[^0-9-]", "", token)
                items.append(("number", token))

        nLines.append(items)

    return nLines


def parse(file):
    contents = open(file, 'r').read()
    lines = lexer(contents)

    return lines