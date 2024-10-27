<template>
  <div
    class="container-input"
    :class="{ 'is-focused': isFocused }"
    ref="containerRef"
  >
    <input
      type="text"
      placeholder="搜索"
      name="text"
      class="input"
      :class="{ typing: isTyping }"
      v-model="searchText"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <svg
      fill="#000000"
      width="20px"
      height="20px"
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
        fill-rule="evenodd"
      ></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')
const isTyping = ref(false)
const isFocused = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

const typingTimer = ref<number | null>(null)
const debounceTimeout = ref<number | null>(null)

const handleInput = () => {
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
  }
  isTyping.value = true
  typingTimer.value = window.setTimeout(() => {
    isTyping.value = false
  }, 1000)

  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value)
  }
  debounceTimeout.value = window.setTimeout(() => {
    console.log('Searching for:', searchText.value)
  }, 300)
}

const handleFocus = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  target.setAttribute('data-placeholder', target.placeholder)
  target.placeholder = ''
  isFocused.value = true
}

const handleBlur = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  if (target.value === '') {
    target.placeholder = target.getAttribute('data-placeholder') || '搜索'
  }
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
  }
  isTyping.value = false
  isFocused.value = false
}
</script>

<style scoped>
/* 搜索输入框容器样式 */
.container-input {
  width: 33.33vw; /* 使用 vw 单位 */
  position: relative;
  transition: width 0.3s ease;
  display: flex;
  justify-content: center;
}

/* 搜索框获得焦点时的容器样式 */
.container-input.is-focused {
  width: 50vw; /* 使用 vw 单位 */
}

.input {
  width: 100%;
  padding: 15px 20px 15px 50px;
  border-radius: 25px;
  border: none;
  background-color: white;
  font-size: 18px;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.input:focus {
  outline: none;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.input.typing {
  background-color: #f3c4fb; /* 输入时搜索框的颜色 */
}

.container-input svg {
  position: absolute;
  left: 18px; /* 控制图标距离搜索框左边的距离 */
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  fill: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.container-input:hover svg,
.container-input:focus-within svg {
  fill: #9d4edd;
}

.input::placeholder {
  color: #999;
  transition: color 0.3s ease;
}

.container-input:hover .input::placeholder {
  color: #9d4edd;
}

.input:focus::placeholder {
  color: transparent;
}

.input:-webkit-autofill,
.input.typing {
  background-color: #f3c4fb !important;
  -webkit-box-shadow: 0 0 0 30px #f3c4fb inset !important;
}
</style>
