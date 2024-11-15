document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const notesContainer = document.getElementById('notesContainer');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // 侧边栏切换
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        // 更新按钮图标状态
        toggleSidebarBtn.classList.toggle('collapsed');
    });

    // 视图切换
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有视图按钮的激活状态
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的激活状态
            button.classList.add('active');
            
            // 移除所有视图类
            notesContainer.classList.remove('grid-view', 'waterfall-view', 'table-view');
            
            // 根据按钮ID添加对应的视图类
            switch(button.id) {
                case 'gridView':
                    notesContainer.classList.add('grid-view');
                    break;
                case 'waterfallView':
                    notesContainer.classList.add('waterfall-view');
                    break;
                case 'tableView':
                    notesContainer.classList.add('table-view');
                    break;
            }
        });
    });

    // 示例笔记数据
    const sampleNotes = [
        {
            id: 1,
            title: '示例笔记 1',
            content: '这是一个示例笔记的内容...',
            folder: '所有笔记',
            date: '2024-01-20'
        },
        // 添加更多示例笔记...
    ];

    // 渲染笔记函数
    function renderNotes(notes) {
        notesContainer.innerHTML = '';
        
        // 添加新建笔记卡片
        const newNoteCard = document.createElement('div');
        newNoteCard.className = 'note-card new-note-card';
        newNoteCard.innerHTML = `
            <div class="plus-icon">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 4v16m-8-8h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        `;
        newNoteCard.addEventListener('click', () => {
            const noteModal = document.getElementById('noteModal');
            noteModal.style.display = 'block';
        });
        notesContainer.appendChild(newNoteCard);
        
        // 渲染现有笔记
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-card';
            
            if (notesContainer.classList.contains('table-view')) {
                noteElement.innerHTML = `
                    <div class="note-title">${note.title}</div>
                    <div class="note-folder">${note.folder}</div>
                    <div class="note-date">${note.date}</div>
                    <div class="note-actions">
                        <button title="编辑">✏️</button>
                        <button title="删除">🗑️</button>
                    </div>
                `;
            } else {
                noteElement.innerHTML = `
                    <div class="note-header">
                        <h3>${note.title}</h3>
                        <div class="note-actions">
                            <button title="编辑">✏️</button>
                            <button title="删除">🗑️</button>
                        </div>
                    </div>
                    <div class="note-content">${note.content}</div>
                    <div class="note-footer">
                        <span class="note-folder">${note.folder}</span>
                        <span class="note-date">${note.date}</span>
                    </div>
                `;
            }
            
            notesContainer.appendChild(noteElement);
        });
    }

    // 初始化显示
    renderNotes(sampleNotes);

    // 添加笔记按钮事件
    const addNoteBtn = document.getElementById('addNote');
    addNoteBtn.addEventListener('click', () => {
        // 显示添加笔记的模态框
        const noteModal = document.getElementById('noteModal');
        noteModal.style.display = 'block';
    });

    // 添加文件夹按钮事件
    const addFolderBtn = document.getElementById('addFolder');
    addFolderBtn.addEventListener('click', () => {
        // 显示添加文件夹的模态框
        const folderModal = document.getElementById('folderModal');
        folderModal.style.display = 'block';
    });

    // 关闭模态框的事件
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
