document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.input');
    let typingTimer;

    input.addEventListener('input', function() {
        clearTimeout(typingTimer);
        this.classList.add('typing');

        typingTimer = setTimeout(() => {
            this.classList.remove('typing');
        }, 1000); // 1秒后移除typing类
    });

    input.addEventListener('blur', function() {
        clearTimeout(typingTimer);
        this.classList.remove('typing');
    });

    if (input) {
        input.addEventListener('focus', function() {
            // 当输入框获得焦点时，清除占位符文本
            this.setAttribute('data-placeholder', this.getAttribute('placeholder'));
            this.setAttribute('placeholder', '');
        });

        input.addEventListener('blur', function() {
            // 当输入框失去焦点且为空时，恢复占位符文本
            if (this.value === '') {
                this.setAttribute('placeholder', this.getAttribute('data-placeholder'));
            }
        });
    }
});
