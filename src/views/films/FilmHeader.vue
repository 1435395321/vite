<template>
    <ul>
      <!--<router-link to="/film/comingsong" active-class="active-li"
            >正在热映</router-link
        >
        <router-link to="/film/noplaying" active-class="active-li"
            >即将上映</router-link
        >-->
    </ul>
</template>

<script>
export default {
    name: "FilmHeader",
};
</script>

<style scope lang="scss">

.active-li {
    color: #22e7ee;
    border-bottom: 2px solid #22e7ee;
}
</style>