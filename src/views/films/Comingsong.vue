<template>
    <div>
        <div class="list">
            <!--<ul>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
            </ul>-->
        </div>
    </div>
</template>

<script>
import {
    defineComponent,
} from "vue";
import { useRouter } from "vue-router";
import { get } from "../../utils/axios";
export default defineComponent({
    name: "Comingsong",
    
});
</script>

<style lang="scss" scope>
.list {
    height: 60px;
    display: flex;
    background: chocolate;
    margin-bottom: 5px;
    line-height: 60px;
    color: #fff;
}
</style>