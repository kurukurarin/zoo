## ВСЕ ENDPOINTS:

###  АУТЕНТИФИКАЦИЯ (`/api/auth`)

POST   /api/auth/login
       Логин администратора
       Body: { email, password }
       Response: { accessToken, refreshToken, admin }

POST   /api/auth/refresh
       Обновить access token
       Cookie: refreshToken (httpOnly)
       Response: { accessToken, admin }

POST   /api/auth/logout
       Логаут
       Response: { message }

GET    /api/auth/me
       Текущий администратор
       Header: Authorization: Bearer <token>
       Response: { admin }




###  ЖИВОТНЫЕ (`/api/animals`)


GET    /api/animals
       Получить всех животных
       Response: [
         {
           id, name, feature, mainPhotoUrl,
           photos: [ { id, photoUrl, order } ],
           extraInfo: [ { id, description, facts } ]
         }
       ]

GET    /api/animals/:id
       Получить животное по ID со всеми связанными данными
       Response: { id, name, feature, mainPhotoUrl, photos, extraInfo }

GET    /api/animals/search/:name
       Поиск животного по названию
       Response: [ { id, name, feature, ... } ]

POST   /api/animals
       Создать животное (только АДМИН)
       Header: Authorization: Bearer <token>
       Body: { name, feature, mainPhotoUrl }
       Response: { id, name, feature, ... }

PUT    /api/animals/:id
       Обновить животное (только АДМИН)
       Header: Authorization: Bearer <token>
       Body: { name, feature, mainPhotoUrl }
       Response: { id, name, feature, ... }

DELETE /api/animals/:id
       Удалить животное (только АДМИН)
       Header: Authorization: Bearer <token>
       Response: { message }




### ФОТОГРАФИИ (`/api/animals/:animalId/photos`)


GET    /api/animals/:animalId/photos
       Получить все фотографии животного
       Response: [
         { id, animalId, photoUrl, order, createdAt, updatedAt }
       ]

POST   /api/animals/:animalId/photos
       Добавить фотографию (только АДМИН)
       Header: Authorization: Bearer <token>
       Body: { photoUrl, order (опционально) }
       Response: { id, animalId, photoUrl, order, ... }

PUT    /api/animals/:animalId/photos/:photoId
       Обновить порядок фотографии (только АДМИН)
       Header: Authorization: Bearer <token>
       Body: { order }
       Response: { id, animalId, photoUrl, order, ... }

DELETE /api/animals/:animalId/photos/:photoId
       Удалить фотографию (только АДМИН)
       Header: Authorization: Bearer <token>
       Response: { message }

PUT    /api/animals/:animalId/photos/reorder
       Переупорядочить все фотографии (только АДМИН)
       Header: Authorization: Bearer <token>
       Response: [ { id, photoUrl, order, ... } ]




### ИНФОРМАЦИЯ О ЖИВОТНЫХ (`/api/animals/:animalId/info`)


GET    /api/animals/:animalId/info
       Получить информацию о животном
       Response: [
         { id, animalId, description, facts, createdAt, updatedAt }
       ]

POST   /api/animals/:animalId/info
       Добавить информацию (только АДМИН)
       Header: Authorization: Bearer <token>
       Body: { description, facts }
       Response: { id, animalId, description, facts, ... }

PUT    /api/animals/:animalId/info/:infoId
       Обновить информацию (только АДМИН)
       Header: Authorization: Bearer <token>
       Body: { description, facts }
       Response: { id, animalId, description, facts, ... }

DELETE /api/animals/:animalId/info/:infoId
       Удалить информацию (только АДМИН)
       Header: Authorization: Bearer <token>
       Response: { message }



###  ТАРИФЫ (`/api/tariffs`)


GET    /api/tariffs
       Получить текущие тарифы
       Response: {
         id, tariff_weekdays, tariff_weekend,
         benefits, conditions, updatedBy,
         updatedByUser: { id, email }, updatedAt
       }

PUT    /api/tariffs
       Обновить тарифы (только АДМИН)
       Header: Authorization: Bearer <token>
       Body: { tariff_weekdays, tariff_weekend, benefits, conditions }
       Response: { id, tariff_weekdays, tariff_weekend, ... }

GET    /api/tariffs/info/last-updated
       Информация об администраторе который последний обновил
       Response: { updatedBy: { id, email }, updatedAt }




### ГЛАВНАЯ СТРАНИЦА (`/api/main-page`)

GET    /api/main-page
       Получить информацию главной страницы
       Response: {
         id, info, contacts,
         updatedBy, updatedByUser: { id, email },
         createdAt, updatedAt
       }

PUT    /api/main-page
       Обновить информацию (только АДМИН)
       Header: Authorization: Bearer <token>
       Body: { info, contacts }
       Response: { id, info, contacts, ... }

GET    /api/main-page/info/last-updated
       Информация об администраторе который последний обновил
       Response: { updatedBy: { id, email }, updatedAt }




## СТАТУС КОДЫ:


200 OK           - Успешный запрос
201 Created      - Ресурс создан
400 Bad Request  - Неверные данные
401 Unauthorized - Требуется токен
403 Forbidden    - Недостаточно прав (не админ)
404 Not Found    - Ресурс не найден
500 Server Error - Ошибка сервера





