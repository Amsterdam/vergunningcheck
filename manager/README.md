# Vergunningcheck Manager

The application provides an Admin interface for managing configuration and content for Vergunningcheck frontend.
The second component is a REST API that can be consumed by GraphQL.

This project is build on Django, pipenv and ASGI.

# Requirements

- python3 en pip3
- pipenv (`pip3 install pipenv`)

# Install and run

```sh
pipenv install
pipenv shell
python manage.py migrate
python manage.py loaddata fixtures
```

Optional:

```
python manage.py createsuperuser
cp manager/settings_local.dist.py manager/settings_local.py
```

Run the application:

```
python manage.py runserver
```


# Testing

```
python manage.py test chappie
```

# Migrations

Update the model class, then;

```
python manage.py makemigrations
python manage.py migrate
```

# Flush / reset the database

```
python manage.py flush
python manage.py loaddata fixtures
python manage.py createsuperuser
```

# Deployment

```
? python manage.py collectstatic
```
