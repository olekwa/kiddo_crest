kiddo_crest
Description
[Write about your project here and also attach your team members]

Usage
clone the repo git clone <repo link>

change into the repo directory cd

install a virtual environment virtualenv <name of your virtual environment>

activate your virtual environment source ./env/Scripts/activate [for windows]

Install dependencies pip install -r requirement.txt

run the server python manage.py runserver

Navigating through the api
http://127.0.0.1:8000/api/v1/register [POST] [for registration]

http://127.0.0.1:8000/api/v1/auth/login [for login, returns a token for authentication]

http://127.0.0.1:8000/api/v1/profile [GET] (proctected)[require token] Returns a user profile

http://127.0.0.1:8000/api/v1/profile/edit PUT[require token] perform update to a user profile

http://127.0.0.1:8000/api/v1/profiles [GET] (returns list of all users profile)

http://127.0.0.1:8000/api/v1/profile/int:pk [GET] (returns a single user profile)

http://127.0.0.1:8000/api/v1/profile/int:pk [DELETE] (proctected)[require token]

http://127.0.0.0.1:8000/api/v1/logout [GET] (proctected)[require token] [for logout]

API Endpoints for books
http://127.0.0.1:8000/api/v1/books [GET] (returns list of all books) (proctected)[require token]

http://127.0.0.1:8000/api/v1/books [POST] (proctected)[require token] [for creating a book]

http://127.0.0.1:8000/api/v1/books/int:pk [GET] (returns a single book) (proctected)[require token]

http://127.0.0.1:8000/api/v1/books/int:pk [PUT] (proctected)[require token] [for updating a book]

http://127.0.0.1:8000/api/v1/books/int:pk [DELETE] (proctected)[require token] [for deleting a book]