# **Database Schema**

## `users`

| column name | data type | details                   |
| ----------- | --------- | ------------------------- |
| id          | integer   | not null, primary key     |
| username    | string    | not null, unique          |
| first_name  | string    | not null,                 |
| last_name   | string    | not null,                 |
| password    | string    | not null,                 |
| email       | string    | not null, indexed, unique |

## `recipes`

| column name  | data type  | details               |
| ------------ | ---------- | --------------------- |
| id           | integer    | not null, primary key |
| title        | string(255)| not null              |
| description  | string(255)| not null              |
| instructions | string(255)| not null              |
| prep_time    | integer    | not null              |
| cook_time    | integer    | not null              |
| total_time   | integer    | not null              |
| ingredients  | string(255)| not null              |
| user_id      | integer    | not null, foreign key |

- `user_id` references `users` table

## `comments`

| column name | data type    | details                |
| ----------- | ------------ | ---------------------- |
| id          | integer      | not null, primary key  |
| recipe_id   | integer      | not null, foreign key  |
| user_id     | integer      | not null, foreign key  |
| comment_text| string(255)  | not null               |
| created_at  | datetime     | not null               |

- `recipe_id` references `recipes` table
- `user_id` references `users` table

## `ratings`

| column name   | data type  | details               |
| ------------- | ---------- | --------------------- |
| id            | integer    | not null, primary key |
| recipe_id     | integer    | not null, foreign key |
| user_id       | integer    | not null, foreign key |
| rating        | integer    | not null              |

- `recipe_id` references `recipes` table
- `user_id` references `users` table