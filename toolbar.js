document.addEventListener('DOMContentLoaded', () => {
    const toolbarContainer = document.querySelector('.toolbar-container');
    const toolbarHandle = document.querySelector('.toolbar-handle');
    const toolbarIcons = document.querySelectorAll('.toolbar__icon');
    const smileIcon = document.querySelector('.icon--smile svg');
    let timeoutId;
    let isMouseOverToolbar = false;

    // 修改展开/收起工具栏的逻辑
    function toggleToolbar() {
        // 只有当工具栏处于收起状态时，点击横线才会展开
        if (toolbarContainer.classList.contains('collapsed')) {
            toolbarContainer.classList.remove('collapsed');
            resetAutoHideTimer();
        }
    }

    // 重置自动隐藏计时器
    function resetAutoHideTimer() {
        clearTimeout(timeoutId);
        if (!isMouseOverToolbar) {
            timeoutId = setTimeout(() => {
                toolbarContainer.classList.add('collapsed');
            }, 3000);
        }
    }

    // 更新笑脸表情
    function updateSmile(position) {
        smileIcon.classList.remove('min-right', 'min-left', 'maj-right', 'maj-left');
        if (position !== 'normal') {
            smileIcon.classList.add(position);
        }
    }

    // 工具栏图标点击事件
    toolbarIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // 移除所有图标的活跃状态
            toolbarIcons.forEach(i => i.classList.remove('is-active'));
            // 为当前图标添加活跃状态
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

            // 调用页面切换函数
            const page = this.dataset.page;
            if (typeof switchPage === 'function') {
                switchPage(page);
            }
        });
    });

    // 点击横线的事件处理
    toolbarHandle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleToolbar();
    });

    // 鼠标进入工具栏
    toolbarContainer.addEventListener('mouseenter', () => {
        isMouseOverToolbar = true;
        clearTimeout(timeoutId);
    });

    // 鼠标离开工具栏
    toolbarContainer.addEventListener('mouseleave', () => {
        isMouseOverToolbar = false;
        resetAutoHideTimer();
    });

    // 点击工具栏时重置计时器
    toolbarContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        resetAutoHideTimer();
    });

    // 点击工具栏以外的地方收起工具栏
    document.addEventListener('click', () => {
        toolbarContainer.classList.add('collapsed');
    });

    // 初始化时设置自动隐藏
    resetAutoHideTimer();
});
