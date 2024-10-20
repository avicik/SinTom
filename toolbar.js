document.addEventListener('DOMContentLoaded', function() {
    // 选择所有工具栏图标和笑脸 SVG
    const toolbarIcons = document.querySelectorAll('.toolbar__icon');
    const smileIcon = document.querySelector('.icon--smile svg');
    
    toolbarIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // 移除所有图标的 is-active 类
            toolbarIcons.forEach(i => i.classList.remove('is-active'));
            
            // 为被点击的图标添加 is-active 类
            this.classList.add('is-active');
            
            // 根据被点击的图标更改背景颜色和笑脸表情
            const iconClass = this.classList;
            if (iconClass.contains('icon--home')) {
                document.body.className = 'bg--blue';
                updateSmile('maj-left');
            } else if (iconClass.contains('icon--chart')) {
                document.body.className = 'bg--green';
                updateSmile('min-left');
            } else if (iconClass.contains('icon--smile')) {
                document.body.className = 'bg--yellow';
                updateSmile('normal');
            } else if (iconClass.contains('icon--bell')) {
                document.body.className = 'bg--red';
                updateSmile('min-right');
            } else if (iconClass.contains('icon--search')) {
                document.body.className = 'bg--purple';
                updateSmile('maj-right');
            }
        });
    });

    // 更新笑脸表情的函数
    function updateSmile(position) {
        // 移除所有可能的位置类
        smileIcon.classList.remove('min-right', 'min-left', 'maj-right', 'maj-left');
        // 如果不是正常位置，添加相应的类
        if (position !== 'normal') {
            smileIcon.classList.add(position);
        }
    }
});
