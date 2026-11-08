document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchUser');

    // Функция форматирования даты (из ISO в ДД.ММ.ГГГГ)
    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('ru-RU');
    }

    // Основная функция получения данных
    async function fetchUser() {
        const btn = fetchButton;
        
        try {
            // Блокируем кнопку, чтобы не спамили кликами, пока идет запрос
            btn.disabled = true;
            btn.textContent = 'Загрузка...';

            const response = await fetch('https://randomuser.me/api/');

            // Проверяем, успешно ли прошел запрос
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }

            const data = await response.json();
            const user = data.results[0];

            // Заполняем инпуты
            document.getElementById('name').value = `${user.name.first} ${user.name.last}`;
            
            // Переводим пол на русский
            document.getElementById('gender').value = user.gender === 'male' ? 'Мужской' : 'Женский';
            
            document.getElementById('email').value = user.email;
            document.getElementById('birthday').value = formatDate(user.dob.date);
            document.getElementById('address').value = `${user.location.city}, ${user.location.country}`;
            document.getElementById('phone').value = user.phone;
            document.getElementById('password').value = user.login.password;

            // Меняем картинку
            const imgElement = document.getElementById('img');
            imgElement.src = user.picture.large;
            imgElement.alt = `Фото ${user.name.first}`;

        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            alert('Не удалось загрузить данные кандидата. Попробуйте еще раз.');
        } finally {
            // Возвращаем кнопку в исходное состояние
            btn.disabled = false;
            btn.textContent = 'Найти нового!';
        }
    }

    // Вешаем слушатель события на кнопку
    fetchButton.addEventListener('click', fetchUser);
});