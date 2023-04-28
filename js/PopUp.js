export class PopUp {
    static ShowMessageWithOkButton(message) {
        // Создаем div элемент для модального окна
        const popupDiv = document.createElement('div');
        popupDiv.style.position = 'fixed';
        popupDiv.style.top = 0;
        popupDiv.style.left = 0;
        popupDiv.style.width = '100%';
        popupDiv.style.height = '100%';
        popupDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        popupDiv.style.display = 'flex';
        popupDiv.style.justifyContent = 'center';
        popupDiv.style.alignItems = 'center';

        // Создаем div элемент для сообщения
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.backgroundColor = '#fff';
        messageDiv.style.padding = '20px';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.boxShadow = '0px 5px 20px rgba(0, 0, 0, 0.5)';
        popupDiv.appendChild(messageDiv);

        // Создаем div элемент для кнопки
        const buttonDiv = document.createElement('div');
        buttonDiv.style.display = 'flex';
        buttonDiv.style.justifyContent = 'center';
        buttonDiv.style.marginTop = '10px';
        messageDiv.appendChild(buttonDiv);

        // Создаем кнопку "Ок"
        const okButton = document.createElement('button');
        okButton.textContent = 'Ok';
        okButton.style.padding = '10px';
        okButton.style.borderRadius = '5px';
        okButton.style.backgroundColor = 'blue';
        okButton.style.color = '#fff';
        okButton.style.border = 'none';
        okButton.style.cursor = 'pointer';
        okButton.style.width = '200px';

        // Добавляем обработчик событий для кнопки "Ок"
        okButton.addEventListener('click', function() {
            // Удаляем модальное окно
            document.body.removeChild(popupDiv);
        });

        buttonDiv.appendChild(okButton);

        // Добавляем модальное окно на страницу
        document.body.appendChild(popupDiv);
    }


}