// 添加页面跳转功能
function switchPage(page) {
    const pageContent = document.getElementById('page-content');
    const searchContainer = document.querySelector('.container-input');

    if (page === 'search') {
        pageContent.innerHTML = '';
        searchContainer.style.display = 'flex';
    } else {
        searchContainer.style.display = 'none';
        pageContent.innerHTML = `<p>成功跳转到${page}页面</p>`;
    }

    // 移除其他图标的活跃状态
    document.querySelectorAll('.toolbar__icon').forEach(i => i.classList.remove('is-active'));
    // 为当前图标添加活跃状态
    document.querySelector(`.icon--${page}`).classList.add('is-active');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toolbar__icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const page = this.dataset.page;
            switchPage(page);
        });
    });

    // 初始化页面为home
    switchPage('home');
});
