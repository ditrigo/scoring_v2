from sys import *
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

        pattern = r"условие\("

        for token in tokens:    
            
            if re.match(pattern, token):
                token = token.replace("условие(", "")
                token = token.replace(" и ", " AND ")
                token = token.replace(" или ", " OR ")
                items.append(("word", token))

            else:
                print(token)
                token = re.sub(r"[^-0-9]", "", token)
                print(token)
                items.append(("number", token))

        nLines.append(items)

    return nLines


def generate_sql_query(data):

    sql_query = "CREATE OR REPLACE FUNCTION test()\nRETURNS void\nLANGUAGE plpgsql\nAS\n$$\nBEGIN\n"
    
    target = "result"
    end = ""
    tabs = "\t"

    prev_type = None

    for sublist in data:

        for item in sublist:

            if item[0] == 'word':
            
                sql_query += f"{tabs}IF {item[1]} THEN\n"
                prev_type = 'word'
                end += f"{tabs}END IF;\n"
                tabs += "\t"

            elif item[0] == 'number':
                if prev_type == 'number':
                    sql_query += f"{tabs[:-1]}ELSE\n"
                sql_query += f"{tabs}{target} := {item[1]};\n"
                prev_type = 'number'
        
        if sublist != data[-1]:
            sql_query += f"{tabs}ELSE\n"
        
    sql_query += f"{tabs}{end}\nEND;\n$$;"
    
    return sql_query


def parser(str):
    
    lst = lexer(str)
    sql_query = generate_sql_query(lst)

    return sql_query