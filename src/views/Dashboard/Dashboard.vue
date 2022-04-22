<template>
  <div>Dashboard page</div>
</template>

<script lang="ts">import request from "@/api";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'PageDashboard',
  setup() {
    const testAuth = async () => {
      try {
        const response = await request.get('/users/get');
        console.log(response);
      }
      
      catch (error) {
        console.log(error);
      }
    }
    
    testAuth();
  }
})
</script>