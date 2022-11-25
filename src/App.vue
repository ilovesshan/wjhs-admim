
<template>
  <p>wjhs-平台端管理系统</p>
</template>

<script setup lang="ts">
import request from "./api/request";

request({
  method: "get",
  url: "/"
}).then(res => {
  console.log(res);
})

</script>


<style lang="less" scoped>

</style>
