<template>
    <section class="hero is-medium">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Loading...
                </h1>
                <progress class="progress is-small is-primary" max="100">50%</progress>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class PageLoader extends Vue {
}
</script>
