<template>
    <div class="app-wrapper"
         :class="{ hideSidebar:!sSidebar.sOpened }">
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <navbar />
            <dynamic-content />
        </div>
    </div>
</template>

<script>
    export default {
        name: "layout",
        computed: {
            sSidebar() {
                return this.$store.state.appStore.sSidebar
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>
