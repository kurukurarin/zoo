API Сервис:

authAPI.login()
authAPI.refreshToken()
authAPI.getCurrentAdmin()
authAPI.logout()

animalAPI.getAll()
animalAPI.getById()
animalAPI.search()
animalAPI.create()
animalAPI.update()
animalAPI.delete()

photoAPI.getByAnimalId()
photoAPI.create()
photoAPI.updateOrder()
photoAPI.delete()
photoAPI.reorder()

infoAPI.getByAnimalId()
infoAPI.create()
infoAPI.update()
infoAPI.delete()

tariffAPI.get()
tariffAPI.update()
tariffAPI.getLastUpdatedInfo()

mainPageAPI.get()
mainPageAPI.update()
mainPageAPI.getLastUpdatedInfo()




Связка такая:
Страница → вызывает метод AnimalApi.getAllAnimals().
AnimalApi → стучится через axiosInstance на сервер (/animals, /animals/:id и т.д.).
Ответ → страница получает data.
Страница → передаёт data в UI-компоненты (<AnimalCard animal={...} />).