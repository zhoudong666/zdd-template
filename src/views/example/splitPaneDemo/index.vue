<template>
  <div style="height: 300px">
    <h5>split-pane标签外层容器必须有宽高</h5>
    <el-divider>分割线</el-divider>
    <split-pane v-on:resize="resize" :min-percent="20" :default-percent="30" :max-percent="40" split="vertical">
      <template slot="paneL">
        <div class="a">
          <ul>
            <li>A 区域</li>
            <li>:default-percent="30"</li>
            <li>:min-percent="20"</li>
            <li>:max-percent="40"</li>
          </ul>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL"><div class="b">B 区域</div></template>
          <template slot="paneR"><div class="c">C 区域</div></template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>
<script>
export default {
  name: 'splitPaneDemo',
  methods: {
    resize(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss">
ul,
li {
  padding: 0;
  margin: 0;
}
.a {
  height: 100%;
  background-color: rgb(245, 224, 224);
}
.b {
  height: 100%;
  background-color: rgb(241, 243, 205);
}
.c {
  height: 100%;
  background-color: rgb(205, 241, 188);
}
</style>
