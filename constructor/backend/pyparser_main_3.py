from datetime import datetime

def pyparser(str):

    if not str:
        return []
    
    res = []
    i = 0
    cond_counter = 0
    res_counter = 0

    while i<len(str):

        if str[i] == "у" and str[i:i+8] == "условие(":

            if cond_counter == 0: 
                cond_start = i+8

                if str[0:i] != '':
                    res.append("add_before")
                    res.append(str[0:i])
            
            cond_counter += 1
            i += 7

        elif str[i] == ")":

            if cond_counter == 1:
                res2_end = i
                result_1 = pyparser(str[res2_start:res2_end])

                res.append("res2")
                res.append(result_1)

                if str[i+1:] != '':
                    res.append("add_after")
                    res.append(str[i+1:])

            cond_counter -= 1

        elif str[i] == ";" and cond_counter == 1:

            if res_counter == 0:
                res_counter += 1
                cond_end = i
                res1_start = i+1
                result_1 = pyparser(str[cond_start:cond_end])

                res.append("cond")
                res.append(result_1)
                
            elif res_counter == 1:
                res_counter = 0
                res1_end = i
                res2_start = i+1
                result_1 = pyparser(str[res1_start:res1_end])

                res.append("res1")
                res.append(result_1)
            
        i += 1

    if res == []:
        return str
    else:
        return res


def generate_condition_string(lst):

    result = ""
    i = 0

    while i < len(lst):
        
        if lst[i] == "cond":
            cond = generate_condition_string(lst[i+1])
            res1 = generate_condition_string(lst[i+3])
            res2 = generate_condition_string(lst[i+5])
            result += f"({res1} if {cond} else {res2})"
 
            i += 6

        elif isinstance(lst[i], list):
            result += generate_condition_string(lst[i])
            i += 1

        else:
            if lst[i] == "add_before" or lst[i] == "add_after":
                result += str(lst[i+1])
                i += 2

            else:
                result += str(lst[i])
                i += 1

    return result


def pre_replace(expression):

    expression = expression.replace("=", "==")
    expression = expression.replace("<>", "!=")
    expression = expression.replace(",", ".")

    while "И(" in expression or "ИЛИ(" in expression:
        i_and = expression.find("И(")
        i_or = expression.find("ИЛИ(")

        if i_and != -1 and (i_or == -1 or i_and < i_or):
            start = i_and
            end = expression.find(")", start)
            sub_expr = expression[start+2:end]
            sub_expr = sub_expr.replace(";", " and ")
            expression = expression[:start] + sub_expr + expression[end+1:]

        else:
            start = i_or
            end = expression.find(")", start)
            sub_expr = expression[start+4:end]
            sub_expr = sub_expr.replace(";", " or ")
            expression = expression[:start] + sub_expr + expression[end+1:]

    while "ПОИСК(" in expression:
        start = expression.find("ПОИСК(")
        end = expression.find(")", start)
        sub_expr = expression[start+6:end]
        search_term, search_in = sub_expr.split(";")
        replacement = f'{search_term} in {search_in}'
        expression = expression[:start] + replacement + expression[end+1:]

    while "РАЗНДАТ(" in expression:
        start = expression.find("РАЗНДАТ(")
        end = expression.find('")', start)
        sub_expr = expression[start+8:end]
        args = sub_expr.split(";")
        if args[1] == "СЕГОДНЯ()":
            args[1] = "datetime.today()"
        unit = args[2]
        if unit == '"y"':
            replacement = f'abs({args[0]}.days - {args[1]}.days)//365'
        elif unit == '"d"':
            replacement = f'abs({args[0]}.days - {args[1]}.days)'
        else:
            replacement = f'abs({args[0]} - {args[1]})'
        expression = expression[:start] + replacement + expression[end+2:]
    
    return expression


def py_parser_main(expression):
    # formula = pre_replace(expression)
    # result = pyparser(pre_replace(expression))
    # result_1 = generate_condition_string(pyparser(pre_replace(expression)))
    return generate_condition_string(pyparser(pre_replace(expression)))


if __name__ == "__main__":

    # Строка 77, Коэффициент долга по 44-ФЗ
    expression = 'условие(dolg=0;0;условие(И(s_1600_4=0;dolg>0);-15;условие(dolg/s_1600_4>0,25;-15;0)))'
    expression2 = 'условие(imported_attributes.dolg=0;0;условие(И(imported_attributes.s_1600_4=0;imported_attributes.dolg>0);-15;условие(imported_attributes.dolg/imported_attributes.s_1600_4>0,25;-15;0)))'
    expression3 = 'условие(imported_attributes.dolg=0;0;условие(И(imported_attributes.s_1600_4=0;imported_attributes.dolg>0);-15;условие(imported_attributes.dolg/imported_attributes.s_1600_4>0,20;-15;0)))'
    print(py_parser_main(expression2))

    # Correct answer: 
    # 0 if (dolg == 0) else (-15 if (s_1600_4 == 0 and dolg > 0) else (-15 if dolg / s_1600_4 > 0.25 else 0))")

# expression = pre_replace(expression2)

# result = pyparser(expression)
# result_1 = generate_condition_string(result)
# print(result_1)


# # Выполнение в питоне
# try:
#     dolg = 5
#     s_1600_4 = 1
#     answer = eval(result_1)
#     print("Answer:", answer)
# except SyntaxError:
#     print("SyntaxError occured")
