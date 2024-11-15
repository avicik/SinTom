// 获取页面内容容器
const pageContent = document.getElementById('page-content');

// 定义各个页面的内容
const pages = {
    home: `
        <div class="welcome-text">欢迎来到文字花园</div>
    `,
    chart: `
        <div class="chart-text">图表页面</div>
    `,
    smile: `
        <div class="smile-text">笑脸页面</div>
    `,
    bell: `
        <div class="bell-text">铃铛页面</div>
    `,
    search: ``  // 搜索页面不需要额外内容
};

// 页面切换函数
function switchPage(page) {
    // 隐藏所有特殊容器
    const searchContainer = document.querySelector('.container-input');
    const noteManager = document.querySelector('.note-manager');
    searchContainer.style.display = 'none';
    noteManager.style.display = 'none';
    
    // 清除页面内容
    pageContent.innerHTML = pages[page];
    
    // 更新工具栏图标状态
    document.querySelectorAll('.toolbar__icon').forEach(icon => {
        icon.classList.remove('is-active');
    });
    document.querySelector(`.icon--${page}`).classList.add('is-active');
    
    // 根据页面类型显示特定功能
    if (page === 'chart') {
        noteManager.style.display = 'flex'; // 使用flex布局显示
        pageContent.style.display = 'none'; // 隐藏原页面内容，因为笔记管理会占满整个区域
    } else if (page === 'search') {
        searchContainer.style.display = 'block';
        pageContent.style.display = 'block';
    } else {
        pageContent.style.display = 'block';
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    const toolbarIcons = document.querySelectorAll('.toolbar__icon');
    toolbarIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const page = icon.dataset.page;
            switchPage(page);
        });
    });

    // 初始化显示首页
    switchPage('home');
});
