export class PopUp {

    static ShowMessageWithOkButton(message) {
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

        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.backgroundColor = '#fff';
        messageDiv.style.padding = '20px';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.boxShadow = '0px 5px 20px rgba(0, 0, 0, 0.5)';
        popupDiv.appendChild(messageDiv);

        const buttonDiv = document.createElement('div');
        buttonDiv.style.display = 'flex';
        buttonDiv.style.justifyContent = 'center';
        buttonDiv.style.marginTop = '10px';
        messageDiv.appendChild(buttonDiv);

        const okButton = document.createElement('button');
        okButton.textContent = 'Ok';
        okButton.style.padding = '10px';
        okButton.style.borderRadius = '5px';
        okButton.style.backgroundColor = 'blue';
        okButton.style.color = '#fff';
        okButton.style.border = 'none';
        okButton.style.cursor = 'pointer';
        okButton.style.width = '200px';

        okButton.addEventListener('click', function() {
            document.body.removeChild(popupDiv);
        });

        buttonDiv.appendChild(okButton);

        document.body.appendChild(popupDiv);
    }

    static ShowMessageWithYesNoButton(message) {
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

        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.backgroundColor = '#fff';
        messageDiv.style.padding = '20px';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.boxShadow = '0px 5px 20px rgba(0, 0, 0, 0.5)';
        popupDiv.appendChild(messageDiv);

        const buttonDiv = document.createElement('div');
        buttonDiv.style.display = 'flex';
        buttonDiv.style.justifyContent = 'space-between'; // изменяем значение на 'space-between', чтобы кнопки располагались справа и слева
        buttonDiv.style.marginTop = '10px';
        messageDiv.appendChild(buttonDiv);

        const yesButton = document.createElement('button');
        yesButton.textContent = 'Yes';
        yesButton.style.padding = '10px';
        yesButton.style.borderRadius = '5px';
        yesButton.style.backgroundColor = 'green'; // изменяем цвет на зеленый
        yesButton.style.color = '#fff';
        yesButton.style.border = 'none';
        yesButton.style.cursor = 'pointer';
        yesButton.style.width = '100px';

        yesButton.addEventListener('click', function() {
            document.body.removeChild(popupDiv);
        });

        const noButton = document.createElement('button');
        noButton.textContent = 'No';
        noButton.style.padding = '10px';
        noButton.style.borderRadius = '5px';
        noButton.style.backgroundColor = 'red'; // изменяем цвет на красный
        noButton.style.color = '#fff';
        noButton.style.border = 'none';
        noButton.style.cursor = 'pointer';
        noButton.style.width = '100px';

        noButton.addEventListener('click', function() {
            document.body.removeChild(popupDiv);
        });

        buttonDiv.appendChild(yesButton);
        buttonDiv.appendChild(noButton);

        document.body.appendChild(popupDiv);
    }


}