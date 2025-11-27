zoo-project/
│
├── backend/                    
│   └── ... (server.js, models, controllers, etc.)
│
└── client/
    ├── src/
    │   ├── app/
    │   │   ├── App.jsx
    │   │   └── App.css
    │   │
    │   ├── pages/
    │   │   ├── HomePage/
    │   │   │   ├── HomePage.jsx
    │   │   │   └── HomePage.css
    │   │   │
    │   │   ├── AnimalsPage/
    │   │   │   ├── AnimalsPage.jsx
    │   │   │   └── AnimalsPage.css
    │   │   │
    │   │   ├── AnimalDetailsPage/
    │   │   │   ├── AnimalDetailsPage.jsx
    │   │   │   └── AnimalDetailsPage.css
    │   │   │
    │   │   ├── TariffsPage/
    │   │   │   ├── TariffsPage.jsx
    │   │   │   └── TariffsPage.css
    │   │   │
    │   │   ├── LoginPage/
    │   │   │   ├── LoginPage.jsx
    │   │   │   └── LoginPage.css
    │   │   │
    │   │   └── admin/
    │   │       ├── AdminPage/
    │   │       │   ├── AdminPage.jsx
    │   │       │   └── AdminPage.css
    │   │       │
    │   │       ├── Admin.Animals/
    │   │       │   ├── AdminAnimalsPage.jsx
    │   │       │   └── AdminAnimalsPage.css
    │   │       │
    │   │       ├── Admin.MainPage/
    │   │       │   ├── AdminMainPagePage.jsx
    │   │       │   └── AdminMainPagePage.css
    │   │       │
    │   │       └── Admin.Tariffs/
    │   │           ├── AdminTariffsPage.jsx
    │   │           └── AdminTariffsPage.css
    │   │
    │   ├── shared/
    │   │   └── lib/
    │   │       ├── axiosInstance.js     
    │   │       ├── setAccessToken.js    
    │   │       │
    │   │       └── api/                 
    │   │           ├── AuthApi.js
    │   │           ├── AnimalApi.js
    │   │           ├── PhotoApi.js
    │   │           ├── InfoApi.js
    │   │           ├── TariffApi.js
    │   │           ├── MainPageApi.js
    │   │           └── index.js         (экспорт)
    │   │
    │   ├── widgets/
    │   │   └── Nav/
    │   │       ├── Nav.jsx
    │   │       └── Nav.css
    │   │
    │   ├── hooks/
    │   │   └── (если будут нужны)
    │   │
    │   ├── main.jsx
    │   └── index.css
    │
    ├── assets/
    │   ├── css/
    │   │   └── main.css         (HTML5UP стили)
    │   ├── images/
    │   └── js/
    │
    ├── index.html
    ├── package.json
    └── vite.config.js