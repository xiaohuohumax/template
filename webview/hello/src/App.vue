<template>
  <div class="text-center p-20">
    <VButton @click="vscode.showMessage({ type: 'info', message: l1on.t('hello') })">{{ l1on.t('hello') }}</VButton>
  </div>
</template>
<script setup lang="ts">
import l1on from './utils/l10n';
import VButton from './components/VButton.vue';
import vscode from './vscode';
</script>