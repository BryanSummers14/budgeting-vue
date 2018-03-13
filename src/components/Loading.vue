<template>
    <div class="loading-overlay">
        <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
</template>

<style scoped>
.loading-overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
}
</style>