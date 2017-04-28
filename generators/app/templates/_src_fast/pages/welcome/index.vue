<template>
	<Row>
        <div class="welcome-container">
        	<h1>Hello,World!</h1>
        	<h2 v-if="bingo">{{bingo}}</h2>
        </div>
    </Row>
</template>
<style scoped lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>