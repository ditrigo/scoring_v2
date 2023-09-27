CREATE OR REPLACE FUNCTION test()
RETURNS void
LANGUAGE plpgsql
AS
$$
BEGIN
IF 3_кредит>300 THEN
наличие_долга := 0;
ELSE
IF 17_вклад<200 THEN
наличие_долга := -50;
ELSE
IF 14_штраф>400 THEN
наличие_долга := -10;

END IF;
END;
$$;