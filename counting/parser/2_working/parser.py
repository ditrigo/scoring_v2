from sys import *
from interpreter import *


def generate_sql_query(data):

    sql_query = "CREATE OR REPLACE FUNCTION test()\nRETURNS void\nLANGUAGE plpgsql\nAS\n$$\nBEGIN\n"
    
    prev_type = None

    for sublist in data:

        for item in sublist:

            if item[0] == 'word':
                sql_query += f"IF {item[1]} THEN\n"
                prev_type = 'word'

            elif item[0] == 'number':
                if prev_type == 'number':
                    sql_query += "ELSE\n"
                sql_query += f"что-то := {item[1]};\n"
                prev_type = 'number'
            
        if sublist != data[-1]:
            sql_query += "ELSE\n"
        
    sql_query += "END IF;\nEND;\n$$;"
    
    return sql_query


if __name__ == '__main__':
    
    lst = parse(argv[1])
    sql_query = generate_sql_query(lst)

    print(sql_query)

    with open('generated_query.sql', 'w', encoding='utf-8-sig') as f:
        f.write(sql_query)

