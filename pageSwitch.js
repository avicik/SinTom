document.addEventListener('DOMContentLoaded', function() {
    const toolbarIcons = document.querySelectorAll('.toolbar__icon');
    const mainContent = document.querySelector('.main-content');

    function switchPage(pageId) {
        // 获取所有可能的页面容器
        const noteManager = document.querySelector('.note-manager');
        const searchContainer = document.querySelector('.container-input');
        const editorContainer = document.getElementById('editorContainer');
        
        // 先隐藏所有内容
        noteManager.style.display = 'none';
        searchContainer.style.display = 'none';
        if (editorContainer) {
            editorContainer.style.display = 'none';
        }

        // 移除所有图标的激活状态
        toolbarIcons.forEach(icon => {
            icon.classList.remove('is-active');
        });

        // 根据页面ID显示对应内容
        switch(pageId) {
            case 'chart':  // 表格页面显示笔记管理
                noteManager.style.display = 'flex';
                break;
            case 'search':
                searchContainer.style.display = 'flex';
                break;
            case 'smile':
                if (editorContainer) {
                    editorContainer.style.display = 'block';
                }
                break;
            case 'home':
                // 主页的其他内容
                break;
        }

        // 激活对应的图标
        const activeIcon = document.querySelector(`.icon--${pageId}`);
        if (activeIcon) {
            activeIcon.classList.add('is-active');
        }
    }

    // 为工具栏图标添加点击事件
    toolbarIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const pageId = this.dataset.page;
            switchPage(pageId);
        });
    });

    // 初始显示主页
    switchPage('home');

    // 导出页面切换函数，供其他模块使用
    window.switchPage = switchPage;
});
