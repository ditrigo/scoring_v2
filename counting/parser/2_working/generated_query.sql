CREATE OR REPLACE FUNCTION test()
RETURNS void
LANGUAGE plpgsql
AS
$$
BEGIN
IF 3_кредит>300 THEN
что-то := 0;
IF 17_вклад<200 THEN
что-то := -50;
IF 14_штраф>400 AND 9_долг<150 THEN
что-то := 0;
ELSE
что-то := -10;
END IF;
END;
$$;