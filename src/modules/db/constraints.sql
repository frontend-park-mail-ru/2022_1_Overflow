CREATE OR REPLACE FUNCTION IsValidEmail(text) returns BOOLEAN AS
    'select $1 ~ ''^[^@\s]+@[^@\s]+(\.[^@\s]+)+$'' as result
         ' LANGUAGE sql;
SELECT IsValidEmail('myemail@address.com');

CREATE OR REPLACE  FUNCTION  IsValidName(name text) returns  BOOLEAN AS $$
    begin
        if (name != regexp_replace(name, '([^A-Za-z])', '', 'g')) then
            return false;
        else
        return true;
        end if;
    end;
$$ language plpgsql;

CREATE OR REPLACE FUNCTION check_user()
RETURNS TRIGGER
AS $$
BEGIN
    if new.age < 0 or new.age > 300 then
        RAISE EXCEPTION 'incorrect age';
    END IF;

    if isvalidname(new.first_name) != true then
        raise exception 'incorrect first_name';
    end if;
    if isvalidname(new.last_name) != true then
        raise exception 'incorrect last_name';
    end if;
    if isvalidname(new.middle_name) != true then
        raise exception 'incorrect middle_name';
    end if;

    if new.email not like '%overflow.ru'  or IsValidEmail(new.email) != true then
         raise exception 'incorrect email';
    end if;

    return new;
END;
$$ LANGUAGE PLPGSQL;

drop trigger if exists check_user on overflow.users;

CREATE TRIGGER check_user BEFORE INSERT ON overflow.users
FOR ROW EXECUTE PROCEDURE check_user();


CREATE OR REPLACE FUNCTION check_mail()
RETURNS TRIGGER
AS $$
BEGIN
    if IsValidEmail(new.sender) != true then
         raise exception 'incorrect addressee';
    end if;

    if  IsValidEmail(new.addressee) != true  then
         raise exception 'incorrect addressee';
    end if;

    return new;
END;
$$ LANGUAGE PLPGSQL;

drop trigger if exists check_mail on overflow.mails;

CREATE TRIGGER check_mail BEFORE  INSERT ON overflow.mails
FOR ROW EXECUTE PROCEDURE check_mail();

insert into overflow.users(first_name, last_name, middle_name, age, email)
values ('Yuriy', 'Anapko', 'Alekseevich', 19, 'a22232a12pko@overflow.ru');
insert into overflow.mails(client_id, sender, addressee,theme,  text, files) values
(1,'a22232a12pko@overflow.ru', 'a22apko@overflow.ru','adasd', 'pr23323', 'dropbox.ru/id1233');
insert into overflow.mails(client_id, sender, addressee,theme,  text, files) values
(1,'a22232a12pko@overflow.ru', 'a22apko@overflow.ru','adas13213123d', 'pr233221312313', 'dropbox.ru/i213123');

insert into overflow.users(first_name, last_name, middle_name, age, email)
values ('Mikhail', 'Rabinovich', 'Alekseevich', 19, 'anime123123lover69@overflow.ru');

Select * from overflow.users where id = 5


