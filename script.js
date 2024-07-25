
document.getElementById('fetchUser').addEventListener('click', fetchUser);

function fetchUser() {
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];
            const fullName = `${user.name.first} ${user.name.last}`;
            const gender = user.gender;
            const email = user.email;
            const birthday = user.dob.date;
            const img = user.picture.large;
            const addres = user.location.city;
            const phone = user.phone;
            const password = user.login.password;

            document.getElementById('password').value = password;
            document.getElementById('phone').value = phone;
            document.getElementById('adres').value = addres;
            document.getElementById('img').src = img;
            document.getElementById('birthday').value = birthday;
            document.getElementById('name').value = fullName;
            document.getElementById('poll').value = gender;
            document.getElementById('email').value = email;
        })
        .catch(error => console.error('Ошибка:', error));
}