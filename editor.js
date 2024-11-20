class NoteEditor {
    constructor() {
        this.setupEditor();
        this.setupEventListeners();
    }

    setupEditor() {
        // 创建编辑器容器
        const editorHTML = `
            <div class="editor-container" id="editorContainer">
                <div class="editor-wrapper">
                    <div class="editor-header">
                        <input type="text" class="editor-title-input" placeholder="请输入笔记标题..." id="noteTitle">
                        <div class="editor-actions">
                            <button class="editor-btn editor-save" id="saveNote">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                                    <polyline points="17 21 17 13 7 13 7 21"/>
                                    <polyline points="7 3 7 8 15 8"/>
                                </svg>
                                保存
                            </button>
                            <button class="editor-btn editor-cancel" id="cancelEdit">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M19 12H5"/>
                                    <path d="M12 19l-7-7 7-7"/>
                                </svg>
                                返回
                            </button>
                        </div>
                    </div>
                    <div class="editor-content" id="editorContent"></div>
                </div>
            </div>
        `;
        
        // 将编辑器添加到主内容区域
        const mainContent = document.querySelector('.main-content');
        mainContent.insertAdjacentHTML('beforeend', editorHTML);

        // 初始化Quill编辑器
        this.quill = new Quill('#editorContent', {
            theme: 'snow',
            placeholder: '开始写作...',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link', 'image'],
                    ['clean']
                ]
            }
        });
    }

    setupEventListeners() {
        const saveBtn = document.getElementById('saveNote');
        const cancelBtn = document.getElementById('cancelEdit');

        saveBtn.addEventListener('click', () => this.saveNote());
        cancelBtn.addEventListener('click', () => this.hideEditor());
    }

    showEditor(note = null) {
        const titleInput = document.getElementById('noteTitle');
        
        if (note) {
            // 保存当前正在编辑的笔记ID
            this.currentNoteId = note.id;
            titleInput.value = note.title || '';
            this.quill.root.innerHTML = note.content || '';
        } else {
            // 新建笔记
            this.currentNoteId = null;
            titleInput.value = '';
            this.quill.root.innerHTML = '';
        }
        
        // 切换到编辑器页面
        window.switchPage('smile');
    }

    hideEditor() {
        // 返回笔记管理页面（表格页面）
        window.switchPage('chart');
    }

    saveNote() {
        const title = document.getElementById('noteTitle').value;
        const content = this.quill.root.innerHTML;
        
        if (!title.trim()) {
            alert('请输入笔记标题');
            return;
        }

        const noteData = {
            id: this.currentNoteId || Date.now(), // 如果是新笔记，使用时间戳作为临时ID
            title: title,
            content: content,
            folder: '所有笔记', // 默认文件夹
            date: new Date().toISOString().split('T')[0],
            lastModified: new Date().toLocaleString()
        };

        // TODO: 实现保存笔记的逻辑
        console.log('保存笔记:', noteData);
        
        this.hideEditor();
    }
}

// 初始化编辑器
document.addEventListener('DOMContentLoaded', () => {
    window.noteEditor = new NoteEditor();
}); 