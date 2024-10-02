<template>
  <button class="btn py-2 px-16 cursor-pointer">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: var(--vscode-button-border);
  background-color: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border-radius: 2px;
}

.btn:hover {
  background-color: var(--vscode-button-hoverBackground);
}
</style>
