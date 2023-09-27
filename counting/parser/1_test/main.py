from sys import *
from interpreter import *


def generate_sql_query(data):
    sql_query = "CREATE OR REPLACE FUNCTION test()\nRETURNS void\nLANGUAGE plpgsql\nAS\n$$\nBEGIN\n"
    
    for sublist in data:
        variable_name, sign, num, number = None, None, None, None
        
        for item in sublist:
            if item[0] == 'word':
                variable_name = item[1]
            elif item[0] == 'sign':
                sign = item[1]
            elif item[0] == 'num':
                num = item[1]
            elif item[0] == 'number':
                number = item[1]
            

        sql_query += f"IF {variable_name}{sign}{num} THEN\nналичие_долга := {number};\n"
        if sublist != data[-1]:
            sql_query += "ELSE\n"
        
    sql_query += "\nEND IF;\nEND;\n$$;"
    
    return sql_query


if __name__ == '__main__':
    lst = parse(argv[1])
    print(lst)
    sql_query = generate_sql_query(lst)
    print(sql_query)

    with open('generated_query.sql', 'w', encoding='utf-8-sig') as f:
        f.write(sql_query)

