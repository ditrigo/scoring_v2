def generate_sql(condition):
    parts = condition.split('(')

    result = ''
    indent = 0

    for part in parts:
        if part.startswith('условие'):
            indent += 1
            result += '\t' * (indent - 1) + 'IF ' + part[8:].replace(',', ' THEN\n')
        else:
            result += '\t' * indent + part.replace(',', ';\n') + '\n'
            indent -= 1

    return result

condition = "условие(3_кредит>300,0,условие(17_вклад<200,-50,условие(14_штраф>400 и 9_долг<150,0,-10)))"
sql_code = generate_sql(condition)
print(f"$$\nBEGIN\n{sql_code}$$;")
