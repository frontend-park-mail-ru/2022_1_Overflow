package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v4/pgxpool"
)

// Структура для юзера
type userT struct {
	id         int32
	firstName  string
	lastName   string
	middleName string
	age        int32
	email      string
}

// Структура письма
type mail struct {
	client_id                             int32
	sender, addressee, theme, text, files string
}

//Получить данные пользователя по его почте
func getUserInfoByEmail(userEmail string) userT {
	var user userT
	urlExample := "postgres://postgres:postgres@localhost:5432/postgres"
	conn, err := pgxpool.Connect(context.Background(), urlExample)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	rows, err := conn.Query(context.Background(), "Select * from overflow.users where email = $1", userEmail)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	for rows.Next() {
		values, err := rows.Values()
		if err != nil {
			log.Fatal("error while iterating dataset")
		}
		user.id = values[0].(int32)
		user.firstName = values[1].(string)
		user.lastName = values[2].(string)
		user.middleName = values[3].(string)
		user.age = values[4].(int32)
		user.email = values[5].(string)
	}
	return user
}

//Получить данные пользователя по его айди в бд
func getUserInfoById(userId int) userT {
	var user userT
	urlExample := "postgres://postgres:postgres@localhost:5432/postgres"
	conn, err := pgxpool.Connect(context.Background(), urlExample)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	rows, err := conn.Query(context.Background(), "Select * from overflow.users where id = $1", userId)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	for rows.Next() {
		values, err := rows.Values()
		if err != nil {
			log.Fatal("error while iterating dataset")
		}
		user.id = values[0].(int32)
		user.firstName = values[1].(string)
		user.lastName = values[2].(string)
		user.middleName = values[3].(string)
		user.age = values[4].(int32)
		user.email = values[5].(string)
	}
	return user
}

// Добавить юзера
func addUser(user userT) {
	urlExample := "postgres://postgres:postgres@localhost:5432/postgres"
	conn, err := pgxpool.Connect(context.Background(), urlExample)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	conn.QueryRow(context.Background(), "insert into overflow.users(first_name, last_name, middle_name, age, email) values ($1, $2, $3, $4, $5);", user.firstName, user.lastName, user.middleName, user.age, user.email)
}

// Добавить почту
func addMail(email mail) {
	urlExample := "postgres://postgres:postgres@localhost:5432/postgres"
	conn, err := pgxpool.Connect(context.Background(), urlExample)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	conn.QueryRow(context.Background(), "insert into overflow.mails(client_id, sender, addressee,theme,  text, files) values($1, $2, $3, $4, $5, $6);", email.client_id, email.sender, email.addressee, email.text, email.files)

}

// Получить входящие сообщения пользователя
func getIncomeMails(userId int) []mail {
	var results []mail
	urlExample := "postgres://postgres:postgres@localhost:5432/postgres"
	conn, err := pgxpool.Connect(context.Background(), urlExample)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	rows, err := conn.Query(context.Background(), "Select * from getIncomeMails($1)", userId)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	for rows.Next() {
		var mails mail
		values, err := rows.Values()
		if err != nil {
			log.Fatal("error while iterating dataset")
		}
		mails.sender = values[0].(string)
		mails.files = values[1].(string)
		mails.theme = values[2].(string)
		mails.text = values[3].(string)
		results = append(results, mails)

	}
	return results
}

//Получить отправленные пользователем сообщения
func getOutcomeMails(userId int) []mail {

	var results []mail
	urlExample := "postgres://postgres:postgres@localhost:5432/postgres"
	conn, err := pgxpool.Connect(context.Background(), urlExample)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	rows, err := conn.Query(context.Background(), "Select * from getOutcomeMails($1)", userId)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	for rows.Next() {
		var mails mail
		values, err := rows.Values()
		if err != nil {
			log.Fatal("error while iterating dataset")
		}
		mails.sender = values[0].(string)
		mails.files = values[1].(string)
		mails.theme = values[2].(string)
		mails.text = values[3].(string)
		results = append(results, mails)

	}
	return results
}

func main() {
	var user userT
	user.firstName = "Mikhail"
	user.middleName = "Alekseevich"
	user.lastName = "Rabinovich"
	user.age = 19
	user.email = "animelover69@overflow.ru"
	addUser(user)
	user = getUserInfoById(5)
	fmt.Print(user)
	results := getOutcomeMails(1)
	fmt.Print(results)
	results = getIncomeMails(1)
	fmt.Print(results)
}
